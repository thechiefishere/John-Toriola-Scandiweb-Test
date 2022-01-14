import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
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
    );
  }
}

export default Navbar;
