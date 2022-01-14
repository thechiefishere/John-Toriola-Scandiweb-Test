import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/context";

export class ProductTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productPrice: 0,
      currencyInUse: null,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setPriceInSelectedCurrency();
    this.setState({ currencyInUse: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.product === null) return;
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      this.setPriceInSelectedCurrency(this.state.product);
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  setPriceInSelectedCurrency = () => {
    if (this.props.product === null || this.state.currencyInUse === null)
      return;
    const priceInSelectedCurrency = this.props.product.prices.find(
      (price) => this.context.currencyInUse === price.currency.symbol
    ).amount;
    this.setState({ productPrice: priceInSelectedCurrency });
  };

  render() {
    return (
      <article
        className={
          this.props.product.id === this.context.clickedProductId
            ? "product-tile clickedProduct"
            : "product-tile"
        }
        onClick={() => this.context.setClickedProductId(this.props.product.id)}
      >
        <img
          className="product-tile__img"
          src={this.props.product.gallery[0]}
          alt={this.props.product.name}
        />
        {this.props.product.id === this.context.clickedProductId && (
          <Link to={`${this.props.product.id}`}>
            <div className="product-tile__icon-container">
              <img
                className="icon product-tile__cart-icon"
                src="/icons/cart.svg"
                alt="cart-icon"
              />
            </div>
          </Link>
        )}
        <div>
          <h4 className="product-tile__name">{this.props.product.name}</h4>
          <h4 className="product-tile__price">
            {this.context.currencyInUse}
            {this.state.productPrice}
          </h4>
        </div>
      </article>
    );
  }
}

export default ProductTile;
