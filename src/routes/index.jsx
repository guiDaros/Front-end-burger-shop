import { createBrowserRouter } from "react-router-dom";

import { Header, Footer } from "../components";
import {
  Cart,
  Home,
  Login,
  Register,
  Menu,
  Checkout,
  CompletePayment,
} from "../container";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/menu",
    element: (
      <>
        <Header />
        <Menu />
        <Footer />
      </>
    ),
  },
  {
    path: "/carrinho",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/complete",
    element: <CompletePayment />,
  },
]);
