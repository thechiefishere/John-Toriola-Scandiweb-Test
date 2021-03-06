import React, { Component } from 'react';
import { client } from '@tilework/opus';
import { currenciesQuery, categoryQuery, categoryNamesQuery } from './queries';
import {
    isProductInCart,
    getUpdatedCartItems,
    getUpdatedCartItemsCount,
    removeFromCart,
    arrayEquality,
    getFilterValuesFromQueryString,
    filterProducts,
} from '../util/functions';
import { object } from 'prop-types';

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
            categoryName: '',
            changeCategoryName: this.changeCategoryName,
            products: [],
            categories: [],
            filteredProducts: [],
            filterValues: [],
            setFilterValues: this.setFilterValues,
            updateFilterValues: this.updateFilterValues,
            cartIconRef: null,
            setCartIconRef: this.setCartIconRef,
        };
    }

    componentDidMount() {
        this.setCurrencies();
        this.getCartItemsFromLocalStorage();
        this.setCategories();
        window.addEventListener('popstate', this.handlePop);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePop);
    }

    handlePop = () => {
        this.setState({ showingMiniCart: false });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.categoryName !== this.state.categoryName) {
            this.setProducts();
        }
        if (!arrayEquality(prevState.filterValues, this.state.filterValues)) {
            const filteredProducts = filterProducts(
                this.state.products,
                this.state.filterValues
            );
            this.setState({ filteredProducts: filteredProducts });
        }
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
        if (this.state.showingMiniCart) {
            window.history.back();
        }
        this.setState({ showingMiniCart: true });
        window.history.pushState('forward', null, '');
        document.body.classList.add('remove-overflow');
    };

    closeMiniCart = () => {
        window.history.back();
        document.body.classList.remove('remove-overflow');
    };

    changeCategoryName = (categoryName) => {
        this.setState({ categoryName: categoryName });
    };

    setProducts = async () => {
        const response = await client.post(categoryQuery(this.state.categoryName));
        this.setState({
            products: response.category.products,
            filteredProducts: response.category.products,
        });
        const filterValuesFromQueryString = getFilterValuesFromQueryString(
            location.search,
            this.state.filterValues
        );
        this.setState({ filterValues: filterValuesFromQueryString });
    };

    setCategories = async () => {
        const response = await client.post(categoryNamesQuery);
        const allCategories = response.categories.map((category) => category.name);
        this.setState({ categories: allCategories });
    };

    setFilterValues = (values) => {
        this.setState({ filterValues: values });
    };

    setCartIconRef = (ref) => {
        this.setState({ cartIconRef: ref });
    };

    addToCartItems = (product, attributes) => {
        const productToAdd = {
            product,
            productCount: 1,
            productAttributes: attributes,
        };
        let items =
      this.state.cartItems.length === 0 ? [] : JSON.parse(this.state.cartItems);

        if (isProductInCart(product, items, attributes)) {
            const updatedCartItems = getUpdatedCartItems(product, items, attributes);
            this.setState({ cartItems: JSON.stringify(updatedCartItems) });
            localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
            return;
        }
        items = [productToAdd, ...items];
        this.setState({ cartItems: JSON.stringify(items) });
        localStorage.setItem('cartItem', JSON.stringify(items));
    };

    updateCartItemCount = (productId, position, count) => {
        let items = JSON.parse(this.state.cartItems);
        const updatedCartItems = getUpdatedCartItemsCount(
            productId,
            position,
            items,
            count
        );
        this.setState({ cartItems: JSON.stringify(updatedCartItems) });
        localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
    };

    removeFromCart = (productId, position) => {
        const updatedItems = removeFromCart(
            productId,
            position,
            this.state.cartItems
        );
        this.setState({ cartItems: JSON.stringify(updatedItems) });
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
            const items = localStorage.getItem('cartItem');
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
        let items = JSON.parse(this.state.cartItems);
        let item = items.find((item, index) => {
            if (item.product.id === productId && index === position) return item;
        });
        if (!item) return;
        return item.productCount;
    };

    updateFilterValues = (update, updateType) => {
        if (updateType === 'ADD')
            this.setState({ filterValues: [...this.state.filterValues, update] });
        else {
            const updatedFilter = this.state.filterValues.filter(
                (value) =>
                    value.attributeName !== update.attributeName ||
          value.attributeValue !== update.attributeValue
            );
            this.setState({ filterValues: [...updatedFilter] });
        }
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
    children: object,
};

ContextProvider.defaultProps = {
    children: {},
};
