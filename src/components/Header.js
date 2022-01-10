import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import shoppingBag from "../shop-bag.jpg";
import { AppContext } from "../store/context";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

export class Header extends Component {
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
                  {state.openCurrencies ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              );
            }}
          </AppContext.Consumer>
          <BsCart2 />
        </div>
      </header>
    );
  }
}

export default Header;
