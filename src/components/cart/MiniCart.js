import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";
import { Link } from "react-router-dom";

export class MiniCart extends Component {
  static contextType = AppContext;
  render() {
    return (
      <section className="mini-cart">
        <h1 className="mini-cart__heading">
          My bag,{" "}
          <span>
            {this.context.cartItems.length}{" "}
            {this.context.cartItems.length > 1 ? "items" : "item"}
          </span>
        </h1>
        {this.context.cartItems.length > 0 ? (
          this.context.cartItems.map((item) => {
            const id = item.split(" ")[0];
            return <CartItem key={item} productId={id} mini={true} />;
          })
        ) : (
          <h1>Your cart is empty</h1>
        )}
        <div className="mini-cart__total">
          <h3 className="mini-cart__total__holder">Total</h3>
          <h3 className="mini-cart__total__value">
            {this.context.currencyInUse}
            {this.context.totalAmountOfAllItemsInCart}
          </h3>
        </div>
        <div className="mini-cart__btn-grp">
          <button
            className="btn mini-cart__btn-grp__btn btn--bag"
            onClick={this.context.toggleMiniCart}
          >
            <Link to="/cart">View Bag</Link>
          </button>
          <button className="btn mini-cart__btn-grp__btn btn--checkout">
            Checkout
          </button>
        </div>
      </section>
    );
  }
}

export default MiniCart;
