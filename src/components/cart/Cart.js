import React, { Component } from 'react';
import CartItem from './CartItem';
import { AppContext } from '../../store/context';
import CartTotal from './CartTotal';

export class Cart extends Component {
    static contextType = AppContext;

    render() {
        const cartItems =
      this.context.cartItems.length === 0
          ? []
          : JSON.parse(this.context.cartItems);

        return (
            <section
                className={`cart ${this.context.showingMiniCart && 'disable-page'}`}
            >
                <h1 className="cart__title">cart</h1>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        const key = item.product.id.concat(item.productAttributes.join());
                        return (
                            <CartItem
                                key={key}
                                product={item.product}
                                mini={false}
                                position={index}
                            />
                        );
                    })
                ) : (
                    <h1 className="cart__empty">Your cart is empty</h1>
                )}
                <CartTotal />
            </section>
        );
    }
}

export default Cart;
