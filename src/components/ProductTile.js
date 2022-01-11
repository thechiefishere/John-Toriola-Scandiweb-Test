import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AppContext } from "../store/context";

export class ProductTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productPrice: 0,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setPriceInSelectedCurrency();
  }

  setPriceInSelectedCurrency = () => {
    const priceInSelectedCurrency = this.props.product.prices.find(
      (price) => this.props.currencyInUse === price.currency.symbol
    ).amount;
    this.setState({ productPrice: priceInSelectedCurrency });
  };

  render() {
    return (
      <article
        className={
          this.props.product.id === this.context.clickedProductId
            ? "productTile clickedProduct"
            : "productTile"
        }
        onClick={() => {
          this.context.setPdp(this.props.product.id);
          this.context.setClickedProductId(this.props.product.id);
        }}
      >
        <img
          src={this.props.product.gallery[0]}
          alt={this.props.product.name}
        />
        <div>
          {this.props.product.id === this.context.clickedProductId && (
            <Link to={`products/${this.props.product.id}`}>
              <BsCart2 />
            </Link>
          )}
        </div>
        <div>
          <h4>{this.props.product.name}</h4>
          <h4>
            {this.props.currencyInUse}
            {this.state.productPrice}
          </h4>
        </div>
      </article>
    );
  }
}

export default ProductTile;
