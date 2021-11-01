import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { Auth0Provider } from "@auth0/auth0-react";

// dev-76p31d13.us.auth0.com
// VfpP3yInrnS7gDmxx9bPFGos823j1vB7

ReactDOM.render(
  <Auth0Provider
    domain="dev-76p31d13.us.auth0.com"
    clientId="VfpP3yInrnS7gDmxx9bPFGos823j1vB7"
    redirectUri={window.location.origin}
    cachelocation="localstorage"
  >
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
