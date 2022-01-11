import React, { Component } from "react";

export class CartItemCount extends Component {
  render() {
    return (
      <article className="cart-item-count">
        <div>
          <button>+</button>
          <button>-</button>
        </div>
        <img src={this.props.gallery[0]} alt={this.props.name} />
      </article>
    );
  }
}

export default CartItemCount;
