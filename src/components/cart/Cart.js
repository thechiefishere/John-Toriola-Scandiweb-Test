import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";

export class Cart extends Component {
  static contextType = AppContext;

  render() {
    return (
      <section className="cart">
        {this.context.cartItems.map((id) => {
          return <CartItem key={id} productId={id} />;
        })}
      </section>
    );
  }
}

export default Cart;
