import React, { Component } from "react";
import { productQuery } from "../store/queries";
import { clientClone } from "../store/context";
import { withRouter } from "../util/withRouter";
import Attribute from "./Attribute";
import { AppContext } from "../store/context";
import { Link } from "react-router-dom";

const client = clientClone();

export class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      firstName: "",
      otherNames: "",
      productPrice: 0,
      currencyInUse: null,
      selectedAttributes: "",
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.setAllState();
    this.setState({ currencyInUse: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.product === null) return;
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      this.setPriceInSelectedCurrency(this.state.product);
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  setAllState = async () => {
    const { productId } = this.props.params;
    const response = await client.post(productQuery(productId));
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

  /**
   * setSelectedAttributes also takes into account
   * changing of selected attribute.
   * @param {index of the attribute in the list of attributes} index
   * @param {value of the selected attribute} value
   */
  setSelectedAttributes = (
    attributeIndex,
    attributeValue,
    attributeType,
    attributeState = "ADD"
  ) => {
    let copyOfSelectedAttribute = this.state.selectedAttributes;
    const attributeToAdd = ` ${attributeIndex}-${attributeValue}-${attributeType}-${attributeState} `;
    copyOfSelectedAttribute = copyOfSelectedAttribute
      .split(" ")
      .filter((item) => {
        const itemIndex = item.split("-")[0];
        if (itemIndex != attributeIndex) {
          return item;
        }
      });
    copyOfSelectedAttribute = copyOfSelectedAttribute.join(" ");

    copyOfSelectedAttribute = copyOfSelectedAttribute
      .concat(attributeToAdd)
      .trim();

    this.setState({ selectedAttributes: copyOfSelectedAttribute });
  };

  render() {
    return (
      <section>
        {this.state.product !== null && (
          <section className="pdp">
            <article className="pdp__all-images">
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
            <section className="pdp__details">
              <img
                className="pdp__details__image"
                src={this.state.product.gallery[0]}
                alt={this.state.product.name}
              />
              <article className="pdp__details__description">
                <h3 className="firstname">{this.state.firstName}</h3>
                <h5 className="othernames">{this.state.otherNames}</h5>
                {this.state.product.attributes.map((attribute, index) => {
                  return (
                    <Attribute
                      key={index}
                      attribute={attribute}
                      setSelectedAttributes={this.setSelectedAttributes}
                      attributeIndex={index}
                    />
                  );
                })}
                <h3 className="pdp__price-title">Price:</h3>
                <AppContext.Consumer>
                  {(state) => {
                    return (
                      <h1 className="price-value">
                        {state.currencyInUse} {this.state.productPrice}
                      </h1>
                    );
                  }}
                </AppContext.Consumer>
                <button
                  className="pdp__btn"
                  onClick={() =>
                    this.context.addToCartItems(
                      this.state.product.id,
                      this.state.selectedAttributes
                    )
                  }
                >
                  <Link className="pdp__btn__link" to="/cart">
                    ADD TO CART
                  </Link>
                </button>
                <div
                  className="pdp__description"
                  dangerouslySetInnerHTML={{
                    __html: this.state.product.description,
                  }}
                ></div>
              </article>
            </section>
          </section>
        )}
      </section>
    );
  }
}

export default withRouter(ProductDetailsPage);
