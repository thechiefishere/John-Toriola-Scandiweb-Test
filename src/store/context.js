import React, { Component } from 'react';
import { client } from '@tilework/opus';
import { currenciesQuery } from './queries';
import {
    isProductInCart,
    getUpdatedCartItems,
    getUpdatedCartItemsCount,
    removeFromCart,
} from '../util/functions';
import { array } from 'prop-types';

export const AppContext = React.createContext();

//Connect client to endPoint
const url = 'http://localhost:4000';
client.setEndpoint(url);

export const clientClone = () => {
    return client;
};

export class ContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: [],
            currencyInUse: '',
            showingCurrencyTab: false,
            openCurrencyTab: this.openCurrencyTab,
            closeCurrencyTab: this.closeCurrencyTab,
            changeCurrencyInUse: this.changeCurrencyInUse,
            cartItems: [],
            addToCartItems: this.addToCartItems,
            removeFromCart: this.removeFromCart,
            updateCartItemCount: this.updateCartItemCount,
            getItemCountInCart: this.getItemCountInCart,
            showingMiniCart: false,
            openMiniCart: this.openMiniCart,
            closeMiniCart: this.closeMiniCart,
            activeLink: '',
            setActiveLink: this.setActiveLink,
        };
    }

    componentDidMount() {
        this.setCurrencies();
        this.getCartItemsFromLocalStorage();
    }

    setCurrencies = async () => {
        const response = await client.post(currenciesQuery);
        const data = response.currencies;
        this.setState({ currencies: data });
        this.setState({ currencyInUse: this.state.currencies[0].symbol });
        this.getCurrencyInUseFromLocalStorage();
    };

    openCurrencyTab = () => {
        this.setState({ showingCurrencyTab: true, showingMiniCart: false });
    };

    closeCurrencyTab = () => {
        this.setState({ showingCurrencyTab: false });
    };

    changeCurrencyInUse = (newCurrency) => {
        this.setState({ currencyInUse: newCurrency, showingCurrencyTab: false });
        localStorage.setItem('currencyInUse', newCurrency);
    };

    openMiniCart = () => {
        this.setState({ showingMiniCart: true });
    };

    closeMiniCart = () => {
        this.setState({ showingMiniCart: false });
    };

    setActiveLink = (link) => {
        this.setState({ activeLink: link });
    };

    addToCartItems = (productId, productAttributes, productPrices) => {
        const productToAdd = {
            productId,
            productCount: 1,
            productPrices,
            productAttributes,
        };
        let items = this.state.cartItems;
        if (isProductInCart(productId, items, productAttributes)) {
            const updatedCartItems = getUpdatedCartItems(
                productId,
                items,
                productAttributes
            );
            this.setState({ cartItems: updatedCartItems });
            localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
            return;
        }
        items = [productToAdd, ...items];
        this.setState({ cartItems: items });
        localStorage.setItem('cartItem', JSON.stringify(items));
    };

    updateCartItemCount = (productId, position, count) => {
        let items = this.state.cartItems;
        const updatedCartItems = getUpdatedCartItemsCount(
            productId,
            position,
            items,
            count
        );
        this.setState({ cartItems: updatedCartItems });
        localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
    };

    removeFromCart = (productId, position) => {
        const updatedItems = removeFromCart(
            productId,
            position,
            this.state.cartItems
        );
        this.setState({ cartItems: updatedItems });
        localStorage.setItem('cartItem', JSON.stringify(updatedItems));
    };

    /**
   * Gets cartItems that have been previously
   * stored on localStorage
   */
    getCartItemsFromLocalStorage = () => {
        if (
            localStorage.getItem('cartItem') !== null &&
      localStorage.getItem('cartItem') !== ''
        ) {
            const items = JSON.parse(localStorage.getItem('cartItem'));
            this.setState({ cartItems: items });
        }
    };

    /**
   * Gets currencyInUse that have been previously
   * stored on localStorage if not found uses
   * the first currency in currencies
   */
    getCurrencyInUseFromLocalStorage = () => {
        if (
            localStorage.getItem('currencyInUse') !== null &&
      localStorage.getItem('currencyInUse') !== ''
        ) {
            const storedCurrency = localStorage.getItem('currencyInUse');
            this.setState({ currencyInUse: storedCurrency });
        }
    };

    /**
   * Returns the count of the product in cartItems
   * @param {id of the product} productId
   * @returns
   */
    getItemCountInCart = (productId, position) => {
        let items = this.state.cartItems;
        let item = items.find((item, index) => {
            if (item.productId === productId && index === position) return item;
        });
        if (!item) return;
        return item.productCount;
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

ContextProvider.propTypes = {
    children: array,
};

ContextProvider.defaultProps = {
    children: [],
};
