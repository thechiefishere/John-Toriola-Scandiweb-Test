import React, { Component } from "react";
import CartItem from "./CartItem";
import { AppContext } from "../../store/context";
import { Link } from "react-router-dom";

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      cartItems: null,
      currencyInUse: "",
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setState({ cartItems: this.context.cartItems });
    this.setState({ currencyInUse: this.context.currencyInUse });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cartItems !== this.context.cartItems ||
      prevState.currencyInUse !== this.context.currencyInUse
    ) {
      const total = this.setTotalPrice(this.context.cartItems);
      this.setState({ cartItems: this.context.cartItems });
      this.setState({ currencyInUse: this.context.currencyInUse });
      this.setState({ totalPrice: total });
    }
  }

  setTotalPrice = (items) => {
    if (this.context.currencyInUse === "") return;
    const total = items.reduce((currentTotal, item) => {
      const val = item.productPrices.find((price) => {
        if (price.currency === this.context.currencyInUse) return price;
      });
      return (currentTotal += val.amount * item.productCount);
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const cartItems = this.context.cartItems;
    const currencyInUse = this.context.currencyInUse;
    const totalAmountOfAllItemsInCart =
      this.context.totalAmountOfAllItemsInCart;
    const toggleMiniCart = this.context.closeMiniCart;

    return (
      <section className="mini-cart">
        <div className="mini-cart__heading-container">
          <h1 className="mini-cart__heading">
            My bag,{" "}
            <span>
              {cartItems.length} {cartItems.length > 1 ? "items" : "item"}
            </span>
          </h1>
          <img
            src={"/icons/cancel.svg"}
            alt="Cancel"
            className="mini-cart__cancel"
            onClick={toggleMiniCart}
          />
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const key = item.productId.concat(item.productAttributes.join());
            return (
              <CartItem
                key={key}
                productId={item.productId}
                mini={true}
                position={index}
              />
            );
          })
        ) : (
          <h1>Your cart is empty</h1>
        )}
        <div className="mini-cart__total">
          <h3 className="mini-cart__total__holder">Total</h3>
          <h3 className="mini-cart__total__value">
            {currencyInUse}
            {this.state.totalPrice}
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
