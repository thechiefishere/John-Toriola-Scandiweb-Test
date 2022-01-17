import React, { Component } from "react";
import { AppContext } from "../../store/context";
import MiniCart from "./MiniCart";

export class CartOverlay extends Component {
  static contextType = AppContext;
  render() {
    const showingMiniCart = this.context.showingMiniCart;

    return (
      <section
        className={
          showingMiniCart ? "cart-overlay show-cart-overlay" : "cart-overlay"
        }
      >
        <div className="cover"></div>
        <MiniCart />
      </section>
    );
  }
}

export default CartOverlay;
