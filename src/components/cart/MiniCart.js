import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";
import { Link } from "react-router-dom";

export class MiniCart extends Component {
  static contextType = AppContext;

  render() {
    return (
      <section className="mini-cart">
        <h1>My bag, {this.context.cartItems.length} items</h1>
        {this.context.cartItems.length > 0 ? (
          this.context.cartItems.map((item) => {
            const id = item.split(" ")[0];
            return <CartItem key={item} productId={id} />;
          })
        ) : (
          <h1>You cart is empty</h1>
        )}
        <div>
          <h3>Total</h3>
          <h3>
            {this.context.currencyInUse}
            {this.context.totalAmountOfAllItemsInCart}
          </h3>
        </div>
        <div>
          <button onClick={this.context.toggleMiniCart}>
            <Link to="/cart">View Bag</Link>
          </button>
          <button>Checkout</button>
        </div>
      </section>
    );
  }
}

export default MiniCart;
