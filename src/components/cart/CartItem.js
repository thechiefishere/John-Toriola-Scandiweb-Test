import React, { Component } from "react";
import { AppContext } from "../../store/context";
import CartItemCount from "./CartItemCount";
import SelectedAttributes from "../SelectedAttributes";
import { productQuery } from "../../store/queries";
import { clientClone } from "../../store/context";
import { splitName, getPriceInSelectedCurrency } from "../../util/functions";

const client = clientClone();

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
    if (prevState.product !== this.state.product) {
      const splittedNames = splitName(this.state.product);
      this.setState({
        firstName: splittedNames[0].firstName,
        otherNames: splittedNames[0].otherNames,
      });
    }
  }

  setProduct = async () => {
    const response = await client.post(productQuery(this.props.productId));
    this.setState({ product: response.product });
  };

  render() {
    const product = this.state.product;
    const mini = this.props.mini;
    const firstName = this.state.firstName;
    const otherNames = this.state.otherNames;
    const currencyInUse = this.context.currencyInUse;
    const productPrice = this.state.productPrice;

    return (
      <section>
        {this.state.product !== null && (
          <section className={mini ? "cart-item cart-item--mini" : "cart-item"}>
            <article className="cart-item__details">
              <h3 className={mini ? "firstname--mini" : "firstname"}>
                {firstName}
              </h3>
              <h5 className={mini ? "othernames--mini" : "othernames"}>
                {otherNames}
              </h5>
              <h3 className={mini ? "price-value--mini" : "price-value"}>
                {currencyInUse}
                {productPrice}
              </h3>
              <SelectedAttributes productId={product.id} mini={mini} />
            </article>
            <CartItemCount
              gallery={product.gallery}
              name={product.name}
              productId={product.id}
              mini={mini}
            />
          </section>
        )}
      </section>
    );
  }
}

export default CartItem;
