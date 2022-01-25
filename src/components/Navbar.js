import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { AppContext } from "../store/context";
import { clientClone } from "../store/context";
import { categoryNamesQuery } from "../store/queries";

const client = clientClone();

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  static contextType = AppContext;
  componentDidMount() {
    this.setCategoryNames();
  }

  setCategoryNames = async () => {
    const response = await client.post(categoryNamesQuery);
    const allCategories = response.categories.map((category) => category.name);
    console.log("cate", allCategories);
    this.setState({ categories: allCategories });
  };

  render() {
    const setActiveLink = this.context.setActiveLink;
    const activeLink = this.context.activeLink;
    const categories = this.state.categories;

    return (
      <div>
        {categories !== null > 0 && (
          <nav className="nav">
            <ul>
              <li
                onClick={() => setActiveLink("/")}
                className={activeLink === "/" ? "active" : ""}
              >
                <Link to="/">ALL</Link>
              </li>
              <li
                onClick={() => setActiveLink("/clothes")}
                className={activeLink === "/clothes" ? "active" : ""}
              >
                <NavLink to={`/${categories[1]}`}>CLOTHES</NavLink>
              </li>
              <li
                onClick={() => setActiveLink("/tech")}
                className={activeLink === "/tech" ? "active" : ""}
              >
                <NavLink to={`/${categories[2]}`}>TECH</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    );
  }
}

export default Navbar;
