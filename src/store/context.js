import React, { Component } from "react";
import { client } from "@tilework/opus";
import { currenciesQuery, allProductsQuery } from "./queries";

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
      currencyInUse: "",
      openCurrencies: false,
    };
  }

  componentDidMount() {
    this.setCurrencies();
    this.setAllProducts();
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
    // console.log("data", data);
    this.setState({ allProducts: data });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
