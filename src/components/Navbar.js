import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { AppContext } from "../store/context";
import { clientClone } from "../store/context";

const client = clientClone();

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  static contextType = AppContext;
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.categories !== this.context.categories &&
      this.context.categories.length !== 0
    ) {
      this.setState({ categories: this.context.categories });
    }
  }

  render() {
    const setActiveLink = this.context.setActiveLink;
    const activeLink = this.context.activeLink;
    const categories = this.state.categories;
    const changeCategoryName = this.context.changeCategoryName;

    return (
      <nav className="nav">
        {categories !== null > 0 && (
          <ul>
            <li
              onClick={() => {
                setActiveLink("/");
                changeCategoryName(`${categories[0]}`);
              }}
              className={activeLink === "/" ? "active" : ""}
            >
              <Link to="/">ALL</Link>
            </li>
            <li
              onClick={() => {
                setActiveLink("/clothes");
                changeCategoryName(`${categories[1]}`);
              }}
              className={activeLink === "/clothes" ? "active" : ""}
            >
              <NavLink to={`/${categories[1]}`}>CLOTHES</NavLink>
            </li>
            <li
              onClick={() => {
                setActiveLink("/tech");
                changeCategoryName(`${categories[2]}`);
              }}
              className={activeLink === "/tech" ? "active" : ""}
            >
              <NavLink to={`/${categories[2]}`}>TECH</NavLink>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Navbar;
