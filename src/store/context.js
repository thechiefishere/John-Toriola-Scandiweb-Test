import React, { Component } from "react";
import { client } from "@tilework/opus";
import { currenciesQuery, categoryQuery, categoryNamesQuery } from "./queries";
import {
  isProductInCart,
  getUpdatedCartItems,
  getUpdatedCartItemsCount,
  removeFromCart,
  getTotalAmountOfAllItemsInCart,
} from "../util/functions";

export const AppContext = React.createContext();

//Connect client to endPoint
const url = "http://localhost:4000";
client.setEndpoint(url);

export const clientClone = () => {
  return client;
};

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      currencyInUse: null,
      showingCurrencyTab: false,
      openCurrencyTab: this.openCurrencyTab,
      closeCurrencyTab: this.closeCurrencyTab,
      changeCurrencyInUse: this.changeCurrencyInUse,
      clickedProductId: "",
      setClickedProductId: this.setClickedProductId,
      cartItems: [],
      addToCartItems: this.addToCartItems,
      removeFromCart: this.removeFromCart,
      updateCartItemCount: this.updateCartItemCount,
      getItemCountInCart: this.getItemCountInCart,
      showingMiniCart: false,
      toggleMiniCart: this.toggleMiniCart,
      allProducts: [],
      categories: [],
      totalAmountOfAllItemsInCart: 0,
      activeLink: "",
      setActiveLink: this.setActiveLink,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
    this.setCategoryNames();
    this.getCartItemsFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currencyInUse !== this.state.currencyInUse ||
      prevState.cartItems !== this.state.cartItems ||
      prevState.allProducts !== this.state.allProducts
    ) {
      this.setTotalAmountOfAllItemsInCart();
    }
  }

  setCurrencies = async () => {
    const response = await client.post(currenciesQuery);
    const data = response.currencies;
    this.setState({ currencies: data });
    this.setState({ currencyInUse: this.state.currencies[0].symbol });
    this.getCurrencyInUseFromLocalStorage();
  };

  setAllProducts = async () => {
    const response = await client.post(categoryQuery("all"));
    this.setState({ allProducts: response.category.products });
  };

  setCategoryNames = async () => {
    const response = await client.post(categoryNamesQuery);
    let allCategories = [];
    response.categories.forEach((category) =>
      allCategories.push(category.name)
    );
    this.setState({ categories: allCategories });
  };

  openCurrencyTab = () => {
    this.setState({ showingCurrencyTab: true, showingMiniCart: false });
  };

  closeCurrencyTab = () => {
    this.setState({ showingCurrencyTab: false });
  };

  changeCurrencyInUse = (newCurrency) => {
    this.setState({ currencyInUse: newCurrency, showingCurrencyTab: false });
    localStorage.setItem("currencyInUse", newCurrency);
  };

  setClickedProductId = (productId) => {
    this.setState({ clickedProductId: productId });
  };

  toggleMiniCart = () => {
    this.setState({
      showingMiniCart: !this.state.showingMiniCart,
      showingCurrencyTab: false,
    });
  };

  setActiveLink = (link) => {
    this.setState({ activeLink: link });
  };

  addToCartItems = (productId, selectedAttributes) => {
    const productToAdd = `${productId} 1 ${selectedAttributes}`;
    const items = this.state.cartItems;
    if (isProductInCart(productId, items)) {
      const updatedCartItems = getUpdatedCartItems(
        productId,
        items,
        selectedAttributes
      );
      this.setState({ cartItems: updatedCartItems });
      localStorage.setItem("cartItem", updatedCartItems);
      return;
    }
    items.unshift(productToAdd);
    this.setState({ cartItems: items });
    this.setTotalAmountOfAllItemsInCart();
    localStorage.setItem("cartItem", items);
  };

  updateCartItemCount = (productId, count) => {
    let items = this.state.cartItems;
    const updatedCartItems = getUpdatedCartItemsCount(productId, items, count);
    this.setState({ cartItems: updatedCartItems });
    localStorage.setItem("cartItem", updatedCartItems);
  };

  removeFromCart = (productId) => {
    const updatedItems = removeFromCart(productId, this.state.cartItems);
    this.setState({ cartItems: updatedItems });
    localStorage.setItem("cartItem", updatedItems);
  };

  /**
   * Gets cartItems that have been previously
   * stored on localStorage
   */
  getCartItemsFromLocalStorage = () => {
    if (
      localStorage.getItem("cartItem") !== null &&
      localStorage.getItem("cartItem") !== ""
    ) {
      const storedString = localStorage.getItem("cartItem").split(",");
      this.setState({ cartItems: storedString });
    }
  };

  /**
   * Gets currencyInUse that have been previously
   * stored on localStorage if not found uses
   * the first currency in currencies
   */
  getCurrencyInUseFromLocalStorage = () => {
    if (
      localStorage.getItem("currencyInUse") !== null &&
      localStorage.getItem("currencyInUse") !== ""
    ) {
      const storedCurrency = localStorage.getItem("currencyInUse");
      this.setState({ currencyInUse: storedCurrency });
    }
  };

  /**
   * Returns the count of the product in cartItems
   * @param {id of the product} productId
   * @returns
   */
  getItemCountInCart = (productId) => {
    let items = this.state.cartItems;
    let item = items.find((item) => {
      const key = item.split(" ")[0];
      if (key === productId) return item;
    });
    if (!item) return;
    return parseInt(item.split(" ")[1]);
  };

  setTotalAmountOfAllItemsInCart = () => {
    if (this.state.allProducts.length === 0) return;
    const total = getTotalAmountOfAllItemsInCart(
      this.state.cartItems,
      this.state.allProducts,
      this.state.currencyInUse
    );
    this.setState({ totalAmountOfAllItemsInCart: total.toFixed(2) });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
