import React, { Component } from 'react';
import CartItem from './CartItem';
import { AppContext } from '../../store/context';
import { getTotalPrice } from '../../util/functions';
import { withRouter } from '../../util/withRouter';
import { func, object } from 'prop-types';

export class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            cartItems: null,
            currencyInUse: '',
        };
    }

    static contextType = AppContext;
    componentDidMount() {
        this.setState({ cartItems: [] });
        this.setState({ currencyInUse: this.context.currencyInUse });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.cartItems !== this.context.cartItems ||
      prevState.currencyInUse !== this.context.currencyInUse
        ) {
            const total = getTotalPrice(
                this.context.cartItems,
                this.context.currencyInUse
            );
            this.setState({ cartItems: this.context.cartItems });
            this.setState({ currencyInUse: this.context.currencyInUse });
            this.setState({ totalPrice: total });
        }
    }

    toggleMiniCart = () => {
        const path = this.props.location.pathname.slice(1);
        if (path !== 'cart') {
            Array.from(Array(2).keys()).forEach(() => {
                this.props.navigate('/cart');
            });
        }
        this.context.closeMiniCart();
    };

    render() {
        const cartItems =
      this.context.cartItems.length === 0
          ? []
          : JSON.parse(this.context.cartItems);
        const currencyInUse = this.context.currencyInUse;
        const closeMiniCart = this.context.closeMiniCart;

        return (
            <section className="mini-cart">
                <div className="mini-cart__heading-container">
                    <h1 className="mini-cart__heading">
            My bag,{' '}
                        <span>
                            {cartItems.length} {cartItems.length > 1 ? 'items' : 'item'}
                        </span>
                    </h1>
                    <img
                        src={'/icons/cancel.svg'}
                        alt="Cancel"
                        className="mini-cart__cancel"
                        onClick={closeMiniCart}
                    />
                </div>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        const key = item.product.id.concat(item.productAttributes.join());
                        return (
                            <CartItem
                                key={key}
                                product={item.product}
                                mini={true}
                                position={index}
                            />
                        );
                    })
                ) : (
                    <h1>Your cart is empty</h1>
                )}
                <div className="mini-cart__total">
                    <h3 className="mini-cart__total__holder">Total</h3>
                    <h3 className="mini-cart__total__value">
                        {currencyInUse}
                        {this.state.totalPrice}
                    </h3>
                </div>
                <div className="mini-cart__btn-grp">
                    <button
                        className="btn mini-cart__btn-grp__btn link--bag"
                        onClick={this.toggleMiniCart}
                    >
            View Bag
                    </button>
                    <button className="btn mini-cart__btn-grp__btn btn--checkout">
            Checkout
                    </button>
                </div>
            </section>
        );
    }
}

MiniCart.propTypes = {
    navigate: func,
    location: object,
};

MiniCart.defaultProps = {
    navigate: () => {},
    location: {},
};

export default withRouter(MiniCart);
