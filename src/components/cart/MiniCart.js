import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";
import { Link } from "react-router-dom";

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
    };
  }
  static contextType = AppContext;
  componentDidMount() {
    this.setState({ totalPrice: 0 });
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.totalPrice !== this.context.totalAmountOfAllItemsInCart) {
  //     this.setState({totalPrice: this.context.totalAmountOfAllItemsInCart});
  //   }
  // }

  render() {
    const cartItems = this.context.cartItems;
    const currencyInUse = this.context.currencyInUse;
    const totalAmountOfAllItemsInCart =
      this.context.totalAmountOfAllItemsInCart;
    const toggleMiniCart = this.context.toggleMiniCart;

    return (
      <section className="mini-cart">
        <h1 className="mini-cart__heading">
          My bag,{" "}
          <span>
            {cartItems.length} {cartItems.length > 1 ? "items" : "item"}
          </span>
        </h1>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const id = item.split(" ")[0];
            return <CartItem key={item} productId={id} mini={true} />;
          })
        ) : (
          <h1>Your cart is empty</h1>
        )}
        <div className="mini-cart__total">
          <h3 className="mini-cart__total__holder">Total</h3>
          <h3 className="mini-cart__total__value">
            {currencyInUse}
            {totalAmountOfAllItemsInCart}
          </h3>
        </div>
        <div className="mini-cart__btn-grp">
          <button
            className="btn mini-cart__btn-grp__btn btn--bag"
            onClick={toggleMiniCart}
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
