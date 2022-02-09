import React, { Component } from 'react';
import shoppingBag from '../shop-bag.jpg';
import { AppContext } from '../store/context';
import Navbar from './Navbar';
import { totalItems } from '../util/functions';

export class Header extends Component {
    static contextType = AppContext;

    handleMiniCartToggle = () => {
        if (!this.context.showingMiniCart) return this.context.openMiniCart;
    };

    render() {
        const currencyInUse = this.context.currencyInUse;
        const showingCurrencyTab = this.context.showingCurrencyTab;
        const numberOfItemsInCart = totalItems(this.context.cartItems);

        return (
            <header className="header">
                <Navbar />
                <img src={shoppingBag} alt="shop-bag" className="bag" />
                <div className="header-end">
                    {currencyInUse !== null && (
                        <div className="currency" onClick={this.context.openCurrencyTab}>
                            <p className="currency-in-use">{currencyInUse}</p>
                            {showingCurrencyTab ? (
                                <img
                                    data-testid="arrowUp"
                                    className="icon icon--toggle"
                                    src="/icons/upArrow.svg"
                                    alt="up-arrow"
                                />
                            ) : (
                                <img
                                    data-testid="arrowDown"
                                    className="icon icon--toggle"
                                    src="/icons/downArrow.svg"
                                    alt="down-arrow"
                                />
                            )}
                        </div>
                    )}
                    <div
                        data-testid="cartLogo"
                        className="cart-icon"
                        onClick={this.handleMiniCartToggle()}
                    >
                        <img className="icon" src="/icons/cart.svg" alt="cart-icon" />
                        <p className="item-count">{numberOfItemsInCart}</p>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
