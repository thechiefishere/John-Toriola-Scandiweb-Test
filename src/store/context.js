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
        const itemToAdd = `${item}${attributeToAdd}`;
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
        let stateIndex = attributeToChange.indexOf("UNCHECKED");
        if (stateIndex < 0)
          attributeToChange = attributeToChange.replace("CHECKED", "UNCHECKED");
        else
          attributeToChange = attributeToChange.replace("UNCHECKED", "CHECKED");
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
        item = `${productId} ${count}`;
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
    console.log("item", item);
    const checkedAttributes = item.split(" ").filter((field) => {
      if (field.indexOf("CHECKED") !== -1) return field;
    });
    console.log("checkedAttributes", checkedAttributes);
    const list = this.getListOfNumberOfDifferentAttribute(checkedAttributes);
    console.log("list", list);
    const numberOfTheProduct =
      this.getTotalNumberOfTheSingleProductInCart(list);
    console.log("numberOfTheProduct", numberOfTheProduct);
    const priceOfProduct = this.getProductPriceInSelectedCurrency(productId);
    console.log("priceOfProduct", priceOfProduct);
    const totalPrice = priceOfProduct * numberOfTheProduct;

    return totalPrice;
  };

  getProductPriceInSelectedCurrency = (productId) => {
    const products = this.state.allProducts;
    let value = "";
    products.forEach((product) => {
      if (product.id === productId) {
        product.prices.map((price) => {
          if (price.currency.symbol === this.state.currencyInUse) {
            console.log("price.amount", price.amount);
            value = price.amount;
            return price.amount;
          }
        });
      }
    });
    return value;
  };

  getTotalNumberOfTheSingleProductInCart = (list) => {
    let total = 1;
    list.forEach((val) => (total *= val));
    return total;
  };

  getListOfNumberOfDifferentAttribute = (checkedAttributes) => {
    const list = [];
    const visited = [];
    for (let i = 0; i < checkedAttributes.length; i++) {
      let count = 0;
      const attributeIndex = checkedAttributes[i].split("-")[0];
      if (visited.includes(attributeIndex)) continue;
      visited.push(attributeIndex);
      for (let j = 0; j < checkedAttributes.length; j++) {
        const index = checkedAttributes[j].split("-")[0];
        if (attributeIndex === index) count++;
      }
      list.push(count);
    }
    return list;
  };

  getProductFromCartItems = (productId) => {
    const items = this.state.cartItems;
    const item = items.find((item) => item.indexOf(productId) !== -1);
    return item;
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
