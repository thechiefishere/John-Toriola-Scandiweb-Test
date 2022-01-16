import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../store/context";

export class Navbar extends Component {
  static contextType = AppContext;
  render() {
    return (
      <nav className="nav">
        <ul>
          <li
            onClick={() => this.context.setActiveLink("/")}
            className={this.context.activeLink === "/" ? "active" : ""}
          >
            <NavLink to="/">ALL</NavLink>
          </li>
          <li
            onClick={() => this.context.setActiveLink("/clothes")}
            className={this.context.activeLink === "/clothes" ? "active" : ""}
          >
            <NavLink to="/clothes">CLOTHES</NavLink>
          </li>
          <li
            onClick={() => this.context.setActiveLink("/tech")}
            className={this.context.activeLink === "/tech" ? "active" : ""}
          >
            <NavLink to="/tech">TECH</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
