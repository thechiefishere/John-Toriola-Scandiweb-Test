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
      currencyInUse: "",
      showingCurrencyTab: false,
      openCurrencyTab: this.openCurrencyTab,
      closeCurrencyTab: this.closeCurrencyTab,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
    this.setClothes();
    this.setTech();
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

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
