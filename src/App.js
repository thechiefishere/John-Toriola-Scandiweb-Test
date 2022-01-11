import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Currency from "./components/Currency";
import Home from "./components/Home";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { ContextProvider } from "./store/context";
import Cart from "./components/cart/Cart";
import CartOverlay from "./components/cart/CartOverlay";

export class App extends Component {
  render() {
    return (
      <ContextProvider>
        <main className="container">
          <Header />
          <Currency />
          <CartOverlay />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/:productId" element={<ProductDetailsPage />} />
            <Route path="clothes/:productId" element={<ProductDetailsPage />} />
            <Route path="tech/:productId" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </ContextProvider>
    );
  }
}

export default App;
