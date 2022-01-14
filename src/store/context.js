import React, { Component } from "react";
import { client } from "@tilework/opus";
import { currenciesQuery, categoryQuery } from "./queries";

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
      totalAmountOfAllItemsInCart: 0,
      getTotalPriceForSingleProduct: this.getTotalPriceForSingleProduct,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
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
    items.push(productToAdd);
    this.setState({ cartItems: items });
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
        const itemToAdd = `${item}_ ${attributeToAdd}`;
        return itemToAdd;
      }
      return item;
    });
    this.setState({ cartItems: items });
    localStorage.setItem("cartItem", items);
  };

  //TODO:Refactor
  updateCartItemAttributeState = (productId, index) => {
    let items = this.state.cartItems;
    items = items.map((item) => {
      let itemToArray = item.split(" ");
      if (itemToArray[0] === productId) {
        let attributeToChange = itemToArray[index + 2];
        let stateIndex = attributeToChange.indexOf("REMOVE");
        if (stateIndex < 0)
          attributeToChange = attributeToChange.replace("ADD", "REMOVE");
        else attributeToChange = attributeToChange.replace("REMOVE", "ADD");
        itemToArray[index + 2] = attributeToChange;
        item = itemToArray.join(" ");
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

  getTotalPriceForSingleProduct = (productId) => {
    const item = this.getProductFromCartItems(productId);
    const numberOfProduct = this.getNumberOfProductsFromCheckedAttribute(item);
    const priceOfProduct = this.getProductPriceInSelectedCurrency(productId);
    const totalPrice = numberOfProduct * priceOfProduct;
    return totalPrice;
  };

  getNumberOfProductsFromCheckedAttribute = (item) => {
    let productCount = 0;
    item.split("_ ").forEach((value) => {
      if (value.indexOf("ADD") !== -1) productCount++;
    });
    return productCount++;
  };

  getProductPriceInSelectedCurrency = (productId) => {
    const products = this.state.allProducts;
    let value = "";
    products.forEach((product) => {
      if (product.id === productId) {
        product.prices.map((price) => {
          if (price.currency.symbol === this.state.currencyInUse) {
            value = price.amount;
            return price.amount;
          }
        });
      }
    });
    return value;
  };

  getProductFromCartItems = (productId) => {
    const items = this.state.cartItems;
    const item = items.find((item) => item.indexOf(productId) !== -1);
    return item;
  };

  setTotalAmountOfAllItemsInCart = () => {
    let total = 0;
    const items = this.state.cartItems;
    items.forEach((item) => {
      const productId = item.split(" ")[0];
      total += this.getTotalPriceForSingleProduct(productId);
    });
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
