import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppContext } from '../store/context';

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

        return (
            <nav className="nav">
                {categories !== null > 0 && (
                    <ul>
                        <li
                            onClick={() => {
                                setActiveLink('/');
                            }}
                            className={activeLink === '/' ? 'active' : ''}
                        >
                            <Link to="/">{categories[0]}</Link>
                        </li>
                        <li
                            onClick={() => {
                                setActiveLink(`/${categories[1]}`);
                            }}
                            className={activeLink === `/${categories[1]}` ? 'active' : ''}
                        >
                            <NavLink to={`/${categories[1]}`}>{categories[1]}</NavLink>
                        </li>
                        <li
                            onClick={() => {
                                setActiveLink(`/${categories[2]}`);
                            }}
                            className={activeLink === `/${categories[2]}` ? 'active' : ''}
                        >
                            <NavLink to={`/${categories[2]}`}>{categories[2]}</NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        );
    }
}

export default Navbar;
