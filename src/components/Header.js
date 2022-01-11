import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import shoppingBag from "../shop-bag.jpg";
import { AppContext } from "../store/context";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

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
                    <FaChevronUp onClick={() => state.closeCurrencyTab()} />
                  ) : (
                    <FaChevronDown onClick={() => state.openCurrencyTab()} />
                  )}
                </div>
              );
            }}
          </AppContext.Consumer>
          <div>
            <BsCart2 onClick={this.context.toggleMiniCart} />
            <p>{this.context.cartItems.length}</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
