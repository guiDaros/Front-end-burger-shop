import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const {
    state: { dpmCheckerLink },
  } = useLocation();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error(
        "Stripe ou Elements não estão carregados. Tente novamente."
      );
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      //se der problema por causa do status de pagamento, muda aqui ||
      // if some error with the status code pops up, fix it here

      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });

        const { status } = await api.post(
          "/orders",
          { products },
          {
            validateStatus: () => true,
          }
        );

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(
              `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`
            );
          }, 3000);
          clearCart();
          toast.success("Pedido Realizado com Sucesso!");
        } else if (status === 409) {
          toast.error("Falha ao Realizar o Pedido");
        } else {
          throw new Error();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Falha no Sistema! Tente Novamente");
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span>
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar Agora"
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div id="dpm-annotation">
        <p>
          Os métodos de pagamento são exibidos com base na sua região.
          <a
            className="link"
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Ver métodos de pagamento disponíveis
          </a>
        </p>
      </div>
    </div>
  );
}
