import React, { Component } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
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
    this.setState({ numberOfItem: this.state.numberOfItem + 1 });
  };

  decreaseNumberOfItem = () => {
    if (this.state.numberOfItem === 1) {
      this.context.removeFromCart(this.props.productId);
      return;
    }
    this.setState({ numberOfItem: this.state.numberOfItem - 1 });
  };

  render() {
    return (
      <article className="cart__item__count">
        <div>
          <button onClick={this.increaseNumberOfItem}>+</button>
          <p>{this.state.numberOfItem}</p>
          <button onClick={this.decreaseNumberOfItem}>-</button>
        </div>
        <div>
          <img src={this.state.productImageString} alt={this.props.name} />
          {this.state.imageCount > 1 && (
            <div>
              <FaChevronLeft onClick={this.previousImage} />
              <FaChevronRight onClick={this.nextImage} />
            </div>
          )}
        </div>
      </article>
    );
  }
}

export default CartItemCount;
