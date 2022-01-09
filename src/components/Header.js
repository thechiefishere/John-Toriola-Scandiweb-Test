import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <header>
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
      </header>
    );
  }
}

export default Header;
