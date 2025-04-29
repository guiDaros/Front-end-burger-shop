import { loadStripe } from "@stripe/stripe-js";


//Public Key (publishable)
const stripePromise = loadStripe(
  "pk_test_51RGPsP2L71f4MXRBjKXqaitqJi9yiTBpYsSoxK8Ig8SAyvxzt3Fo0nJ0xP31PhuSCAbMMvUV5Bm1Ii95YSsoeecp00SZR9HhlJ"
);

export default stripePromise