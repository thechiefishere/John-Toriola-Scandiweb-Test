import React, { Component } from "react";
import { client } from "@tilework/opus";
import { currenciesQuery, categoryQuery, categoryNamesQuery } from "./queries";

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
      updateCartItemCount: this.updateCartItemCount,
      updateCartItemAttributeState: this.updateCartItemAttributeState,
      getItemCountInCart: this.getItemCountInCart,
      showingMiniCart: false,
      toggleMiniCart: this.toggleMiniCart,
      allProducts: [],
      categories: [],
      totalAmountOfAllItemsInCart: 0,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
    this.setCategoryNames();
    this.setTotalAmountOfAllItemsInCart();
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
  };

  setClickedProductId = (productId) => {
    this.setState({ clickedProductId: productId });
  };

  addToCartItems = (productId, selectedAttributes) => {
    const productToAdd = `${productId} 1 ${selectedAttributes}`;
    const items = this.state.cartItems;
    if (this.productIsInCart(productId, items)) {
      this.updateProductInCart(productId, items, selectedAttributes);
      return;
    }
    items.unshift(productToAdd);
    this.setState({ cartItems: items });
    this.setTotalAmountOfAllItemsInCart();
    localStorage.setItem("cartItem", items);
  };

  productIsInCart = (productId, cartItems) => {
    const item = cartItems.find((item) => {
      const itemId = item.split(" ")[0];
      if (itemId === productId) return item;
    });
    if (item) return true;

    return false;
  };

  updateProductInCart = (productId, cartItems, attributeToAdd) => {
    const items = cartItems.map((item) => {
      const itemId = item.split(" ")[0];
      if (itemId === productId) {
        item = item.split(" ").filter((value) => value !== attributeToAdd);
        item = item.join(" ");
        item = item.concat(` ${attributeToAdd}`);
        return item;
      }
      return item;
    });
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  updateCartItemCount = (productId, count) => {
    let items = this.state.cartItems;
    items = items.map((item) => {
      let key = item.split(" ")[0];
      if (key === productId) {
        let itemToArray = item.split(" ");
        itemToArray.splice(1, 1);
        itemToArray.splice(1, 0, count);
        item = itemToArray.join(" ");
        return item;
      }
      return item;
    });
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  /**avoid using index as key */
  removeFromCart = (productId) => {
    let items = this.state.cartItems;
    items = items.filter((item) => {
      const key = item.split(" ")[0];
      if (key !== productId) return item;
    });
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  getCartItemsFromLocalStorage = () => {
    if (localStorage.getItem("cartItem") !== null) {
      const storedString = localStorage.getItem("cartItem").split(",");
      this.setState({ cartItems: storedString });
    }
  };

  getItemCountInCart = (productId) => {
    let items = this.state.cartItems;
    let item = items.find((item) => {
      const key = item.split(" ")[0];
      if (key === productId) return item;
    });
    if (!item) return;
    return parseInt(item.split(" ")[1]);
  };

  toggleMiniCart = () => {
    this.setState({
      showingMiniCart: !this.state.showingMiniCart,
      showingCurrencyTab: false,
    });
  };

  setTotalAmountOfAllItemsInCart = () => {
    let total = 0;
    const items = this.state.cartItems;
    const products = this.state.allProducts;
    if (items.length === 0) return total;
    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].split(" ")[0];
      const itemCount = parseInt(items[i].split(" ")[1]);
      for (let j = 0; j < products.length; j++) {
        const product = products[j];
        if (itemId === product.id) {
          product.prices.map((price) => {
            if (price.currency.symbol === this.state.currencyInUse) {
              const productTotalWithCount = price.amount * itemCount;
              total += productTotalWithCount;
            }
          });
        }
      }
    }
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
