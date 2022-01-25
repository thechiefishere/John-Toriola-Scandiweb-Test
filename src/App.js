import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Currency from "./components/Currency";
import Home from "./components/categories/Home";
import ProductDetailsPage from "./components/ProductDetailsPage";
import Cart from "./components/cart/Cart";
import CartOverlay from "./components/cart/CartOverlay";
import { AppContext } from "./store/context";

export class App extends Component {
  static contextType = AppContext;

  toggleCurrencyTab = () => {
    if (this.context.showingCurrencyTab) return this.context.closeCurrencyTab;
  };

  render() {
    return (
      <Router>
        <main className="container" onClick={this.toggleCurrencyTab()}>
          <Header />
          <Currency />
          <CartOverlay />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Home />} />
            <Route path="/tech" element={<Home />} />
            <Route path="/:productId" element={<ProductDetailsPage />} />
            <Route path="clothes/:productId" element={<ProductDetailsPage />} />
            <Route path="tech/:productId" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </Router>
    );
  }
}

export default App;
