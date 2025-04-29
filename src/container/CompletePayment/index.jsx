import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "../../components/Stripe/styles.css";

const SuccessIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <linearGradient
      id="5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1"
      x1="9.858"
      x2="38.142"
      y1="9.858"
      y2="38.142"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" color="#21ad64"></stop>
      <stop offset="1" color="#088242"></stop>
    </linearGradient>
    <path
      fill="url(#5zzMGVQnN_QyRYWGmJUsQa_A8xKzsTKHhzn_gr1)"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    ></path>
    <path
      d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z"
      opacity=".05"
    ></path>
    <path
      d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"
    ></path>
  </svg>
);

const ErrorIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <path
      fill="#f44336"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    ></path>
    <path
      fill="#fff"
      d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
    ></path>
    <path
      fill="#fff"
      d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
    ></path>
  </svg>
);

const InfoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 50 50"
  >
    <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
  </svg>
);

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Pagemento Efetuado com Sucesso!",
    iconColor: "#30B130",
    icon: SuccessIcon,
    buttonText: "Voltar para a loja",
    url: "/",
  },
  processing: {
    text: "Pagamento em Processamento",
    iconColor: "#6D6E78",
    icon: InfoIcon,
    buttonText: "Voltar para a loja",
    url: "/",
  },
  requires_payment_method: {
    text: "Falha no Pagamento, Tente Novamente!",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
    buttonText: "Tentar Novamente",
    url: "/carrinho",
  },
  default: {
    text: "Algo deu Erado, Tente Novamente!",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
    buttonText: "Tentar Novamente",
    url: "/",
  },
};

export function CompletePayment() {
  const stripe = useStripe();

  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return (
    <div className="container">
      <div id="payment-status">
        <div
          id="status-icon"
          style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}
        >
          {STATUS_CONTENT_MAP[status].icon}
        </div>
        <h2 id="status-text" className="status-title">
          {STATUS_CONTENT_MAP[status].text}
        </h2>
        {intentId && (
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="TableLabel">id</td>
                  <td id="intent-id" className="TableContent">
                    {intentId}
                  </td>
                </tr>
                <tr>
                  <td className="TableLabel">status</td>
                  <td id="intent-status" className="TableContent">
                    {status}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {intentId && (
          <a
            href={`https://dashboard.stripe.com/payments/${intentId}`}
            id="view-details"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ver detalhes
          </a>
        )}

        <a id="retry-button" href={STATUS_CONTENT_MAP[status].url}>
          {STATUS_CONTENT_MAP[status].buttonText}
        </a>
      </div>
    </div>
  );
}
