import React, { Component } from 'react';
import { AppContext } from '../../store/context';
import { getTaxValue, getTotalPrice, totalItems } from '../../util/functions';

export class CartTotal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            totalPrice: 0,
            currencyInUse: '',
        };
    }

    static contextType = AppContext;
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.cartItems !== this.context.cartItems ||
      prevState.currencyInUse !== this.context.currencyInUse
        ) {
            const total = getTotalPrice(
                this.context.cartItems,
                this.context.currencyInUse
            );
            this.setState({ currencyInUse: this.context.currencyInUse });
            this.setState({ totalPrice: total });
            this.setState({ cartItems: this.context.cartItems });
        }
    }

    render() {
        const currencyInUse = this.state.currencyInUse;
        const totalPrice = this.state.totalPrice;
        const numberOfItemsInCart = totalItems(this.context.cartItems);

        return (
            <aside className="cart-total">
                <h1 className="cart-total__segments cart-total__tax">
          Tax 21%:{' '}
                    <span>
                        {currencyInUse}
                        {getTaxValue(totalPrice, currencyInUse)}{' '}
                    </span>
                </h1>
                <h1 className="cart-total__segments">
          Quantity: <span>{numberOfItemsInCart}</span>
                </h1>
                <h1 className="cart-total__segments cart-total__price">
          Total:{' '}
                    <span>
                        {' '}
                        {currencyInUse}
                        {totalPrice}
                    </span>
                </h1>
                <button className="btn btn--cart">ORDER</button>
            </aside>
        );
    }
}

export default CartTotal;
