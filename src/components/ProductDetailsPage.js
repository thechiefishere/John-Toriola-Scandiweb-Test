import React, { Component } from "react";
import { productQuery } from "../store/queries";
import { clientClone } from "../store/context";
import { withRouter } from "../util/withRouter";
import Attribute from "./Attribute";
import { AppContext } from "../store/context";
import { splitName, getPriceInSelectedCurrency } from "../util/functions";

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
      selectedAttributes: null,
      error: false,
      pictureIndex: 0,
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
      const priceInSelectedCurrency = getPriceInSelectedCurrency(
        this.state.product,
        this.state.currencyInUse
      );
      this.setState({ productPrice: priceInSelectedCurrency });
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  setAllState = async () => {
    const { productId } = this.props.params;
    const response = await client.post(productQuery(productId));
    this.setState({ product: response.product });
    this.initSelectedAttributes(response.product);
    const splittedNames = splitName(response.product);
    this.setState({
      firstName: splittedNames[0].firstName,
      otherNames: splittedNames[0].otherNames,
    });
  };

  initSelectedAttributes = (product) => {
    const array = product.attributes.map((attribute) => "");
    this.setState({ selectedAttributes: array });
  };

  /**
   * setSelectedAttributes also takes into account
   * changing of selected attribute.
   * @param {index of the attribute in the list of attributes} index
   * @param {value of the selected attribute} value
   */
  setSelectedAttributes = (attributeIndex, attributeValue, attributeType) => {
    let copyOfSelectedAttribute = this.state.selectedAttributes;
    const attributeToAdd = `${attributeValue}-${attributeType}`;
    copyOfSelectedAttribute[attributeIndex] = attributeToAdd;
    this.setState({ selectedAttributes: copyOfSelectedAttribute });
  };

  handleAddToCart = () => {
    let copyOfSelectedAttribute = this.state.selectedAttributes;
    if (copyOfSelectedAttribute.indexOf("") != -1) {
      this.setState({ error: true });
      return;
    }
    copyOfSelectedAttribute = copyOfSelectedAttribute.join("_");
    console.log("copyOfSelectedAttribute", copyOfSelectedAttribute);
    this.context.addToCartItems(this.state.product.id, copyOfSelectedAttribute);
    this.props.navigate("/cart");
  };

  render() {
    const product = this.state.product;
    const pictureIndex = this.state.pictureIndex;
    const firstName = this.state.firstName;
    const otherNames = this.state.otherNames;
    const error = this.state.error;
    const currencyInUse = this.context.currencyInUse;
    const productPrice = this.state.productPrice;

    return (
      <section>
        {product !== null && (
          <section className="pdp">
            <article className="pdp__all-images">
              {product.gallery.map((pictureLink, index) => {
                return (
                  <img
                    key={index}
                    src={pictureLink}
                    alt={product.name}
                    onClick={() => {
                      this.setState({ pictureIndex: index });
                    }}
                    className={`${
                      index === pictureIndex && "pdp__all-images__shade"
                    }`}
                  />
                );
              })}
            </article>
            <section className="pdp__details">
              <img
                className="pdp__details__image"
                src={product.gallery[pictureIndex]}
                alt={product.name}
              />
              <article className="pdp__details__description">
                <h3 className="firstname">{firstName}</h3>
                <h5 className="othernames">{otherNames}</h5>
                {product.attributes.map((attribute, index) => {
                  return (
                    <Attribute
                      key={index}
                      attribute={attribute}
                      setSelectedAttributes={this.setSelectedAttributes}
                      attributeIndex={index}
                    />
                  );
                })}
                <p
                  className={
                    error ? "pdp__error pdp__show-error" : "pdp__error"
                  }
                >
                  Please select from all specs field
                </p>
                <h3 className="pdp__price-title">Price:</h3>
                {currencyInUse !== null && (
                  <h1 className="price-value">
                    {currencyInUse} {productPrice}
                  </h1>
                )}
                <button
                  className="pdp__btn"
                  onClick={() => this.handleAddToCart()}
                >
                  ADD TO CART
                </button>
                <div
                  className="pdp__description"
                  dangerouslySetInnerHTML={{
                    __html: product.description,
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
