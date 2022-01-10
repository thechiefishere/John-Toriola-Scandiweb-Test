import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";

export class ProductTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productPrice: 0,
    };
  }

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
      <article className="producttile">
        <img
          src={this.props.product.gallery[0]}
          alt={this.props.product.name}
        />
        <div>
          <BsCart2 />
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
