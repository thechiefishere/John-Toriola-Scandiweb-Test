import React, { Component } from "react";
import { AppContext } from "../../store/context";
import MiniCart from "./MiniCart";

export class CartOverlay extends Component {
  static contextType = AppContext;
  render() {
    return (
      <section
        className={
          this.context.showingMiniCart
            ? "cart-overlay show-cart-overlay"
            : "cart-overlay"
        }
      >
        <div className="overlay"></div>
        <MiniCart />
      </section>
    );
  }
}

export default CartOverlay;
