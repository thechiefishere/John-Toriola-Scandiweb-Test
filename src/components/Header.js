import React, { Component } from "react";
import shoppingBag from "../shop-bag.jpg";
import { AppContext } from "../store/context";
import Navbar from "./Navbar";

export class Header extends Component {
  static contextType = AppContext;

  render() {
    const currencyInUse = this.context.currencyInUse;
    const showingCurrencyTab = this.context.showingCurrencyTab;
    const closeCurrencyTab = this.context.closeCurrencyTab;
    const openCurrencyTab = this.context.openCurrencyTab;
    const toggleMiniCart = this.context.toggleMiniCart;
    const cartItems = this.context.cartItems;

    return (
      <header className="header">
        <Navbar />
        <img src={shoppingBag} alt="shop-bag" className="bag" />
        <div className="header-end">
          {currencyInUse !== null && (
            <div className="currency">
              <p className="currency-in-use">{currencyInUse}</p>
              {showingCurrencyTab ? (
                <img
                  data-testid="arrowUp"
                  className="icon icon--toggle"
                  onClick={closeCurrencyTab}
                  src="/icons/upArrow.svg"
                  alt="up-arrow"
                />
              ) : (
                <img
                  data-testid="arrowDown"
                  className="icon icon--toggle"
                  onClick={openCurrencyTab}
                  src="/icons/downArrow.svg"
                  alt="down-arrow"
                />
              )}
            </div>
          )}
          <div
            data-testid="cartLogo"
            className="cart-icon"
            onClick={toggleMiniCart}
          >
            <img className="icon" src="/icons/cart.svg" alt="cart-icon" />
            <p className="item-count">{cartItems.length}</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
