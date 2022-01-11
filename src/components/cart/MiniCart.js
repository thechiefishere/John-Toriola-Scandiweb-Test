import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";

export class MiniCart extends Component {
  static contextType = AppContext;

  render() {
    return (
      <section className="mini-cart">
        <h1>My bag, items</h1>
        {this.context.cartItems.map((id, index) => {
          return <CartItem key={index} productId={id} />;
        })}
        <div>
          <h3>Total</h3>
          <h3>I am total</h3>
        </div>
        <div>
          <button>View Bag</button>
          <button>Checkout</button>
        </div>
      </section>
    );
  }
}

export default MiniCart;
