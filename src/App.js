import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Currency from "./components/Currency";
import Home from "./components/Home";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { ContextProvider } from "./store/context";

export class App extends Component {
  render() {
    return (
      <ContextProvider>
        <main className="container">
          <Header />
          <Currency />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/tech" element={<Tech />} />
            <Route
              path="products/:productId"
              element={<ProductDetailsPage />}
            />
          </Routes>
        </main>
      </ContextProvider>
    );
  }
}

export default App;
