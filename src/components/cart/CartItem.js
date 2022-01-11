import React, { Component } from "react";
import { AppContext } from "../../store/context";
import CartItemCount from "./CartItemCount";
import Attribute from "../Attribute";
import { productQuery } from "../../store/queries";
import { client } from "@tilework/opus";

const url = "http://localhost:4000";
client.setEndpoint(url);

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      firstName: "",
      otherNames: "",
      productPrice: 0,
      currencyInUse: null,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setProduct();
    this.splitName(this.state.product);
    this.setState({ currencyInUse: this.context.currencyInUse });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("this.context.currencyInUse", this.context.currencyInUse);
    // console.log("prevState.currencyInUse", prevState.currencyInUse);
    console.log("cartItems", this.context.cartItems);
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      this.setPriceInSelectedCurrency(this.state.product);
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  setProduct = async () => {
    const response = await client.post(productQuery(this.props.productId));
    this.setState({ product: response.product });
  };

  splitName = (product) => {
    if (product === null) return;
    const splittedName = product.name.split(" ");
    this.setState({ firstName: splittedName.shift() });
    if (splittedName.length <= 0) return;
    this.setState({ otherNames: splittedName.join(" ") });
  };

  setPriceInSelectedCurrency = (product) => {
    // console.log("product is ", product);
    if (product === null || this.state.currencyInUse === null) return;
    // console.log("this.context.currencyInUse", this.context.currencyInUse);
    // console.log("price.currency.symbol", product.prices.currency.symbol);
    const priceInSelectedCurrency = product.prices.find(
      (price) => this.context.currencyInUse === price.currency.symbol
    ).amount;
    this.setState({ productPrice: priceInSelectedCurrency });
  };

  render() {
    return (
      <section className="cart-item">
        {this.state.product !== null && (
          <section>
            <article>
              <h1>{this.state.firstName}</h1>
              <h3>{this.state.otherNames}</h3>
              <h3>
                {this.context.currencyInUse}
                {this.state.productPrice}
              </h3>
              {this.state.product.attributes.map((attribute, index) => {
                return <Attribute key={index} attribute={attribute} />;
              })}
            </article>
            <CartItemCount
              gallery={this.state.product.gallery}
              name={this.state.product.name}
            />
          </section>
        )}
      </section>
    );
  }
}

export default CartItem;
