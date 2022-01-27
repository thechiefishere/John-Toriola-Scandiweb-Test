import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../store/context';
import {
    getPriceInSelectedCurrency,
    defaultAttributes,
    getProductPrices,
} from '../util/functions';
import { object } from 'prop-types';

export class ProductTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productPrice: 0,
            currencyInUse: null,
            beingHovered: false,
        };
    }

    static contextType = AppContext;
    componentDidMount() {
        this.setState({ currencyInUse: null });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.product === null) return;
        if (prevState.currencyInUse !== this.context.currencyInUse) {
            const priceInSelectedCurrency = getPriceInSelectedCurrency(
                this.props.product,
                this.state.currencyInUse
            );
            this.setState({ productPrice: priceInSelectedCurrency });
            this.setState({ currencyInUse: this.context.currencyInUse });
        }
    }

    addToCart = () => {
        const selectedAttributes = defaultAttributes(this.props.product);
        const productPrices = getProductPrices(this.props.product);
        this.context.addToCartItems(
            this.props.product.id,
            selectedAttributes,
            productPrices
        );
    };

    render() {
        const product = this.props.product;
        const hover = this.state.beingHovered;
        const currencyInUse = this.context.currencyInUse;
        const productPrice = this.state.productPrice;

        return (
            <article
                className={`product-tile ${hover && 'hoveredProduct'}`}
                onMouseOver={() => this.setState({ beingHovered: true })}
                onMouseOut={() => this.setState({ beingHovered: false })}
            >
                <Link to={`/${product.id}`}>
                    <div className="product-tile__img-container">
                        <img
                            className="product-tile__img"
                            src={product.gallery[0]}
                            alt={product.name}
                        />
                        {!product.inStock && (
                            <p className="product-tile__stock-msg">OUT OF STOCK</p>
                        )}
                    </div>

                    <div>
                        <h4
                            className={
                                product.inStock
                                    ? 'product-tile__name'
                                    : 'product-tile__name product-tile__name--no-stock'
                            }
                        >
                            {product.name} {product.brand}
                        </h4>
                        <h4
                            className={
                                product.inStock
                                    ? 'product-tile__price'
                                    : 'product-tile__price product-tile__price--no-stock'
                            }
                        >
                            {currencyInUse}
                            {productPrice}
                        </h4>
                    </div>
                </Link>
                <button
                    className={`product-tile__icon-container ${
                        hover && 'product-tile__show-icon-container'
                    }`}
                    onClick={() => this.addToCart()}
                    disabled={!product.inStock ? true : false}
                >
                    <img
                        className="icon product-tile__cart-icon"
                        src="/icons/cart.svg"
                        alt="cart-icon"
                    />
                </button>
            </article>
        );
    }
}

ProductTile.propTypes = {
    product: object,
};

ProductTile.defaultProps = {
    product: {},
};

export default ProductTile;
