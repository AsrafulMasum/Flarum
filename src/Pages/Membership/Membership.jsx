import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./CheckOut";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Membership = () => {
  return (
    <div className="min-h-screen py-40">
      <LayoutContainer>
        <Elements stripe={stripePromise}>
          <Checkout></Checkout>
        </Elements>
      </LayoutContainer>
    </div>
  );
};

export default Membership;
