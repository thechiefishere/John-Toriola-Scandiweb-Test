import React, { Component } from "react";
import { client } from "@tilework/opus";
import { currenciesQuery } from "./queries";

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
      totalItemsInCart: 0,
      totalPrice: 0,
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
      showingMiniCart: false,
      toggleMiniCart: this.toggleMiniCart,
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
  };

  openCurrencyTab = () => {
    this.setState({ showingCurrencyTab: true });
  };

  closeCurrencyTab = () => {
    this.setState({ showingCurrencyTab: false });
  };

  changeCurrencyInUse = (newCurrency) => {
    this.setState({ currencyInUse: newCurrency });
    this.setState({ showingCurrencyTab: false });
  };

  setClickedProductId = (productId) => {
    this.setState({ clickedProductId: productId });
  };

  addToCartItems = (productId) => {
    if (this.state.cartItems.indexOf(productId) >= 0) return;
    const items = this.state.cartItems;
    items.push(productId);
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  /**avoid using index as key */
  removeFromCart = (productId) => {
    let items = this.state.cartItems;
    items = items.filter((id) => id !== productId);
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  getCartItemsFromLocalStorage = () => {
    if (localStorage.getItem("cartItem") !== null) {
      const storedString = localStorage.getItem("cartItem").split(",");
      this.setState({ cartItems: storedString });
    }
  };

  toggleMiniCart = () => {
    this.setState({ showingMiniCart: !this.state.showingMiniCart });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
