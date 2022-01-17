import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../store/context";

export class Navbar extends Component {
  static contextType = AppContext;

  render() {
    const setActiveLink = this.context.setActiveLink;
    const activeLink = this.context.activeLink;

    return (
      <nav className="nav">
        <ul>
          <li
            onClick={() => setActiveLink("/")}
            className={activeLink === "/" ? "active" : ""}
          >
            <NavLink to="/">ALL</NavLink>
          </li>
          <li
            onClick={() => setActiveLink("/clothes")}
            className={activeLink === "/clothes" ? "active" : ""}
          >
            <NavLink to="/clothes">CLOTHES</NavLink>
          </li>
          <li
            onClick={() => setActiveLink("/tech")}
            className={activeLink === "/tech" ? "active" : ""}
          >
            <NavLink to="/tech">TECH</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
