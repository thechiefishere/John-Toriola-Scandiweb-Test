import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";

export class Cart extends Component {
  static contextType = AppContext;

  render() {
    const cartItems = this.context.cartItems;

    return (
      <section className="cart">
        <h1 className="cart__title">cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const key = item.productId.concat(item.productAttributes.join());
            return (
              <CartItem
                key={key}
                productId={item.productId}
                mini={false}
                position={index}
              />
            );
          })
        ) : (
          <h1 className="cart__empty">Your cart is empty</h1>
        )}
      </section>
    );
  }
}

export default Cart;
