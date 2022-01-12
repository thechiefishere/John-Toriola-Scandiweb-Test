import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import shoppingBag from "../shop-bag.jpg";
import { AppContext } from "../store/context";

export class Header extends Component {
  static contextType = AppContext;
  render() {
    return (
      <header className="header">
        <nav>
          <ul>
            <li>
              <NavLink to="/">ALL</NavLink>
            </li>
            <li>
              <NavLink to="/clothes">CLOTHES</NavLink>
            </li>
            <li>
              <NavLink to="/tech">TECH</NavLink>
            </li>
          </ul>
        </nav>
        <img src={shoppingBag} alt="shop-bag" className="bag" />
        <div className="header-end">
          <AppContext.Consumer>
            {(state) => {
              return (
                <div className="currency">
                  <p>{state.currencyInUse}</p>
                  {state.showingCurrencyTab ? (
                    <img
                      onClick={state.closeCurrencyTab}
                      src="/icons/upArrow.svg"
                      alt="up-arrow"
                    />
                  ) : (
                    <img
                      onClick={state.openCurrencyTab}
                      src="/icons/downArrow.svg"
                      alt="down-arrow"
                    />
                  )}
                </div>
              );
            }}
          </AppContext.Consumer>
          <div>
            <img
              onClick={this.context.toggleMiniCart}
              src="/icons/cart.svg"
              alt="cart-icon"
            />
            <p>{this.context.cartItems.length}</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
