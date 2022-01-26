import React, { Component } from "react";
import { AppContext } from "../../store/context";

export class CartItemCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfItem: 1,
      productImageString: this.props.gallery[0],
      imageCount: this.props.gallery.length,
      count: 0,
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setNumberOfItemFromContext();
  }

  componentDidUpdate(prevProps, prevState) {
    let itemCountInCart = this.context.getItemCountInCart(
      this.props.productId,
      this.props.position
    );
    if (prevState.numberOfItem !== itemCountInCart) {
      this.setNumberOfItemFromContext();
    }
  }

  setNumberOfItemFromContext = () => {
    let itemCountInCart = this.context.getItemCountInCart(
      this.props.productId,
      this.props.position
    );
    if (!itemCountInCart) return;
    this.setState({ numberOfItem: itemCountInCart });
  };

  nextImage = () => {
    let nextImageIndex = this.state.count;
    if (this.state.count >= this.props.gallery.length - 1) {
      nextImageIndex = 0;
      this.setState({ count: 0 });
    } else {
      nextImageIndex += 1;
      this.setState({ count: this.state.count + 1 });
    }
    this.setState({ productImageString: this.props.gallery[nextImageIndex] });
  };

  previousImage = () => {
    let nextImageIndex = this.state.count;
    if (this.state.count <= 0) {
      nextImageIndex = this.props.gallery.length - 1;
      this.setState({ count: this.props.gallery.length - 1 });
    } else {
      nextImageIndex -= 1;
      this.setState({ count: this.state.count - 1 });
    }
    this.setState({ productImageString: this.props.gallery[nextImageIndex] });
  };

  increaseNumberOfItem = () => {
    let itemCount = this.state.numberOfItem + 1;
    this.setState({ numberOfItem: itemCount });
    this.context.updateCartItemCount(
      this.props.productId,
      this.props.position,
      itemCount
    );
  };

  decreaseNumberOfItem = () => {
    let itemCount = this.state.numberOfItem - 1;
    if (itemCount === 0) {
      this.context.removeFromCart(this.props.productId, this.props.position);
      return;
    }
    this.setState({ numberOfItem: itemCount });
    this.context.updateCartItemCount(
      this.props.productId,
      this.props.position,
      itemCount
    );
  };

  updateCartItem = () => {};

  render() {
    const productImageString = this.state.productImageString;
    const name = this.props.name;
    const mini = this.props.mini;
    const numberOfItem = this.state.numberOfItem;
    const galleryLength = this.state.imageCount;

    return (
      <article className="cart-count">
        <div className="cart-count__btn-grp">
          <button
            className="cart-count__btn cart-count__btn--1"
            onClick={this.increaseNumberOfItem}
          >
            <p className="cart-count__btn__val">+</p>
          </button>
          <p className="cart-count__num">{numberOfItem}</p>
          <button
            className="cart-count__btn cart-count__btn--2"
            onClick={this.decreaseNumberOfItem}
          >
            <p className="cart-count__btn__val">-</p>
          </button>
        </div>
        <div className="cart-count__img-switcher">
          <div className="cart-count__img-container">
            <img
              className="cart-count__img"
              src={productImageString}
              alt={name}
            />
          </div>
          {!mini && galleryLength > 1 && (
            <div className="cart-count__icon-container">
              <img
                className="cart-count__icon"
                onClick={this.previousImage}
                src="/icons/leftArrow.svg"
                alt="left-arrow"
              />
              <img
                className="cart-count__icon"
                onClick={this.nextImage}
                src="/icons/rightArrow.svg"
                alt="right-arrow"
              />
            </div>
          )}
        </div>
      </article>
    );
  }
}

export default CartItemCount;
