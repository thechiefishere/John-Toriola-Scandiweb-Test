import React, { Component } from "react";
import { client } from "@tilework/opus";

import {
  currenciesQuery,
  allProductsQuery,
  clothesQuery,
  techQuery,
} from "./queries";

export const AppContext = React.createContext();

//Connect client to endPoint
const url = "http://localhost:4000";
client.setEndpoint(url);

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalItemsInCart: 0,
      totalPrice: 0,
      currencies: [],
      allProducts: [],
      clothes: [],
      tech: [],
      currencyInUse: "ha",
      showingCurrencyTab: false,
      openCurrencyTab: this.openCurrencyTab,
      closeCurrencyTab: this.closeCurrencyTab,
      changeCurrencyInUse: this.changeCurrencyInUse,
      clickedProductId: "",
      setClickedProductId: this.setClickedProductId,
      cartItems: [],
      addToCartItems: this.addToCartItems,
      // pdp: 0,
      // setPdp: this.setPdp,
      // pp: null,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
    this.setClothes();
    this.setTech();
    // this.setP();
  }

  setCurrencies = async () => {
    const response = await client.post(currenciesQuery);
    const data = response.currencies;
    this.setState({ currencies: data });
    this.setState({ currencyInUse: this.state.currencies[0].symbol });
  };

  setAllProducts = async () => {
    const response = await client.post(allProductsQuery);
    const data = response.category.products;
    this.setState({ allProducts: data });
  };

  setClothes = async () => {
    const response = await client.post(clothesQuery);
    const data = response.category.products;
    this.setState({ clothes: data });
  };

  setTech = async () => {
    const response = await client.post(techQuery);
    const data = response.category.products;
    this.setState({ tech: data });
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
    this.setState({ cartItems: [...this.state.cartItems, productId] });
  };

  // setPdp = (productId) => {
  //   this.setState({ pdp: productId });
  // };

  // que = () => {
  //   const productQuery = new Query("product")
  //     .addArgument("id", "String!", this.state.pdp)
  //     .addField("name")
  //     .addField("gallery")
  //     .addField(
  //       new Field("prices", true)
  //         .addField("amount")
  //         .addField(new Field("currency").addField("symbol"))
  //     )
  //     .addField(
  //       new Field("attributes", true)
  //         .addField("name")
  //         .addField("type")
  //         .addField(new Field("items").addField("displayValue"))
  //     );
  //   return productQuery;
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currencyInUse !== this.state.currencyInUse) {
  //     this.setP();
  //   }
  // }

  // setP = async () => {
  //   if (this.state.pdp === 0) return;
  //   const productQuery = this.que();
  //   const response = await client.post(productQuery);
  //   // console.log("response", response.product);
  //   // console.log("pdp is ", this.state.pdp);
  //   this.setState({ pp: response.product });
  // };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
