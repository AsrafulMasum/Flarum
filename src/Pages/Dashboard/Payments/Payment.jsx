import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Checkout></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;