import React, { Component } from "react";
import { AppContext } from "../../store/context";
import CartItemCount from "./CartItemCount";
import SelectedAttributes from "../SelectedAttributes";
import { getPriceInSelectedCurrency } from "../../util/functions";
import { bool, string, number } from "prop-types";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      productPrice: 0,
      currencyInUse: null,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setState({ product: this.props.product });
    this.setState({ currencyInUse: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currencyInUse !== this.context.currencyInUse) {
      const priceInSelectedCurrency = getPriceInSelectedCurrency(
        this.state.product,
        this.state.currencyInUse
      );
      this.setState({ productPrice: priceInSelectedCurrency });
      this.setState({ currencyInUse: this.context.currencyInUse });
    }
  }

  render() {
    const product = this.state.product;
    const mini = this.props.mini;
    const currencyInUse = this.context.currencyInUse;
    const productPrice = this.state.productPrice;
    const position = this.props.position;

    return (
      <section>
        {this.state.product !== null && (
          <section>
            {!mini && <div className="cart-item-line"></div>}
            <section
              className={mini ? "cart-item cart-item--mini" : "cart-item"}
            >
              <article className="cart-item__details">
                <h3 className={mini ? "firstname--mini" : "firstname"}>
                  {product.name}
                </h3>
                <h5 className={mini ? "othernames--mini" : "othernames"}>
                  {product.brand}
                </h5>
                <h3 className={mini ? "price-value--mini" : "price-value"}>
                  {currencyInUse}
                  {productPrice}
                </h3>
                <SelectedAttributes
                  productId={product.id}
                  mini={mini}
                  position={position}
                />
              </article>
              <CartItemCount
                gallery={product.gallery}
                name={product.name}
                productId={product.id}
                mini={mini}
                position={position}
              />
            </section>
          </section>
        )}
      </section>
    );
  }
}

CartItem.propTypes = {
  productId: string,
  position: number,
  mini: bool,
};

CartItem.defaultProps = {
  productId: "",
  position: 0,
  mini: false,
};

export default CartItem;
