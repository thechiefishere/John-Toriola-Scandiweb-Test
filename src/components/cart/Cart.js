import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";

export class Cart extends Component {
  static contextType = AppContext;

  render() {
    return (
      <section className="cart">
        {this.context.cartItems.length > 0 ? (
          this.context.cartItems.map((item) => {
            const id = item.split(" ")[0];
            return <CartItem key={item} productId={id} />;
          })
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </section>
    );
  }
}

export default Cart;
