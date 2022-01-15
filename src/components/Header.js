import React, { Component } from "react";
import shoppingBag from "../shop-bag.jpg";
import { AppContext } from "../store/context";
import Navbar from "./Navbar";

export class Header extends Component {
  static contextType = AppContext;
  render() {
    return (
      <header className="header">
        <Navbar />
        <img src={shoppingBag} alt="shop-bag" className="bag" />
        <div className="header-end">
          {this.context.currencyInUse !== null && (
            <div className="currency">
              <p className="currency-in-use">{this.context.currencyInUse}</p>
              {this.context.showingCurrencyTab ? (
                <img
                  className="icon icon--toggle"
                  onClick={this.context.closeCurrencyTab}
                  src="/icons/upArrow.svg"
                  alt="up-arrow"
                />
              ) : (
                <img
                  className="icon icon--toggle"
                  onClick={this.context.openCurrencyTab}
                  src="/icons/downArrow.svg"
                  alt="down-arrow"
                />
              )}
            </div>
          )}
          <div className="cart-icon">
            <img
              className="icon"
              onClick={this.context.toggleMiniCart}
              src="/icons/cart.svg"
              alt="cart-icon"
            />
            <p className="item-count">{this.context.cartItems.length}</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
