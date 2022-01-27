import React, { Component } from 'react';
import { AppContext } from '../../store/context';
import CartItemCount from './CartItemCount';
import SelectedAttributes from '../SelectedAttributes';
import { productQuery } from '../../store/queries';
import { clientClone } from '../../store/context';
import { getPriceInSelectedCurrency } from '../../util/functions';
import { bool, string, number } from 'prop-types';

const client = clientClone();

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
    }

    setProduct = async () => {
        const response = await client.post(productQuery(this.props.productId));
        this.setState({ product: response.product });
    };

    render() {
        const product = this.state.product;
        const mini = this.props.mini;
        const currencyInUse = this.context.currencyInUse;
        const productPrice = this.state.productPrice;
        const position = this.props.position;

        return (
            <section>
                {this.state.product !== null && (
                    <section className={mini ? 'cart-item cart-item--mini' : 'cart-item'}>
                        <article className="cart-item__details">
                            <h3 className={mini ? 'firstname--mini' : 'firstname'}>
                                {product.name}
                            </h3>
                            <h5 className={mini ? 'othernames--mini' : 'othernames'}>
                                {product.brand}
                            </h5>
                            <h3 className={mini ? 'price-value--mini' : 'price-value'}>
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
    productId: '',
    position: 0,
    mini: false,
};

export default CartItem;
