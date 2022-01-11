import React, { Component } from "react";
import { client } from "@tilework/opus";
import { Field, Query } from "@tilework/opus";
import { withRouter } from "../util/withRouter";
import Attribute from "./Attribute";
import { AppContext } from "../store/context";
import { Link } from "react-router-dom";

const url = "http://localhost:4000";
client.setEndpoint(url);

export class ProductDetailsPage extends Component {
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
    this.setAllState();
    this.setState({ currencyInUse: this.context.currencyInUse });
    // console.log(
    //   "currencyInUse in componentDidMount is....",
    //   this.context.currencyInUse
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      this.setPriceInSelectedCurrency(this.state.product);
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  setAllState = async () => {
    const { productId } = this.props.params;
    // this.context.setPdp(productId);
    const productQuery = new Query("product")
      .addArgument("id", "String!", productId)
      .addField("id")
      .addField("name")
      .addField("gallery")
      .addField("description")
      .addField(
        new Field("prices", true)
          .addField("amount")
          .addField(new Field("currency").addField("symbol"))
      )
      .addField(
        new Field("attributes", true)
          .addField("name")
          .addField("type")
          .addField(new Field("items").addField("displayValue"))
      );
    const response = await client.post(productQuery);
    this.setState({ product: response.product });
    this.splitName(response.product);
  };

  splitName = (product) => {
    if (product === null) return;
    const splittedName = product.name.split(" ");
    this.setState({ firstName: splittedName.shift() });
    if (splittedName.length <= 0) return;
    this.setState({ otherNames: splittedName.join(" ") });
  };

  setPriceInSelectedCurrency = (product) => {
    if (product === null || this.state.currencyInUse === null) return;
    const priceInSelectedCurrency = product.prices.find(
      (price) => this.context.currencyInUse === price.currency.symbol
    ).amount;
    this.setState({ productPrice: priceInSelectedCurrency });
  };

  render() {
    // this.setPriceInSelectedCurrency(this.state.product);
    return (
      <section>
        {this.state.product !== null && (
          <section className="pdp">
            <article className="pdp-other_images">
              {this.state.product.gallery.map((pictureLink, index) => {
                return (
                  <img
                    key={index}
                    src={pictureLink}
                    alt={this.state.product.name}
                  />
                );
              })}
            </article>
            <section className="pdp-details">
              <img
                className="pdp-image"
                src={this.state.product.gallery[0]}
                alt={this.state.product.name}
              />
              <article>
                <h3>{this.state.firstName}</h3>
                <h5>{this.state.otherNames}</h5>
                {this.state.product.attributes.map((attribute, index) => {
                  return <Attribute key={index} attribute={attribute} />;
                })}
                <h3>Price:</h3>
                <AppContext.Consumer>
                  {(state) => {
                    return (
                      <h1>
                        {state.currencyInUse} {this.state.productPrice}
                      </h1>
                    );
                  }}
                </AppContext.Consumer>
                <button
                  onClick={() =>
                    this.context.addToCartItems(this.state.product.id)
                  }
                >
                  <Link to="/cart">ADD TO CART</Link>
                </button>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.product.description,
                  }}
                ></div>
              </article>
            </section>
          </section>
        )}
      </section>
      //   <div>Hello</div>
    );
  }
}

export default withRouter(ProductDetailsPage);
