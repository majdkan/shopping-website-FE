import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./components/context/ProductsProvider";
import { FullCustomerDetailsProvider } from "./components/context/FullCustomerDetailsProvider";
import { CartProvider } from "./components/context/CartProvider";
import { AuthProvider } from "./components/context/AuthProvider";
import { WishlistProvider } from "./components/context/WishlistProvider";
import { OrdersProvider } from "./components/context/OrdersProvider";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <FullCustomerDetailsProvider>
         <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrdersProvider>
                  <App />
                </OrdersProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </FullCustomerDetailsProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
