import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();

  const url = `/cart/${user?.email}`;
  const { data: allCart, refetch } = useLoadSecureData(url);

  const totalPrice = allCart?.reduce((total, item) => {
    return total + item?.itemPrice;
  }, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handlePayments = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErr("");
    }

    const { error: err, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (err) {
      console.log(err);
    } else {
      console.log(paymentIntent);
    }

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent?.id);

      const paymentInfo = {
        email: user?.email,
        price: totalPrice,
        date: new Date(),
        cartId: allCart?.map((cart) => cart?._id),
        menuId: allCart?.map((cart) => cart?.itemId),
        status: "pending",
        transactionId: paymentIntent?.id,
      };
      const res = await axiosSecure.post("/payments", paymentInfo)
      if(res?.data?.deletedResult?.deletedCount && res?.data?.paymentResult?.insertedId){
        refetch()
        navigate("/dashboard/payments/history")
      }

    } else {
      setTransactionId("");
    }
  };

  return (
    <div>
      <form onSubmit={handlePayments}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-success px-4 my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay $ {totalPrice}
        </button>
      </form>
      {err && <p className="text-red-600">{err}</p>}
      {transactionId && (
        <p>
          Your Transaction ID:{" "}
          <span className="text-green-600 font-bold">{transactionId}</span>
        </p>
      )}
    </div>
  );
};

export default Checkout;
