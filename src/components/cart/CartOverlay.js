import React, { Component } from 'react';
import { AppContext } from '../../store/context';
import { withRouter } from '../../util/withRouter';
import MiniCart from './MiniCart';
import { object } from 'prop-types';

export class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        };
    }
    static contextType = AppContext;

    componentDidMount() {
        const location = this.props.location.pathname;
        this.setState({ path: location });
    }

    componentDidUpdate() {
        if (this.state.path !== this.props.location.pathname) {
            this.context.closeMiniCart();
            this.setState({ path: this.props.location.pathname });
        }
    }

    render() {
        const showingMiniCart = this.context.showingMiniCart;

        return (
            <section
                data-testid="cartOverlay"
                className={
                    showingMiniCart ? 'cart-overlay show-cart-overlay' : 'cart-overlay'
                }
            >
                <div className="cover"></div>
                <MiniCart />
            </section>
        );
    }
}

CartOverlay.propTypes = {
    location: object,
};

CartOverlay.defaultProps = {
    location: {},
};

export default withRouter(CartOverlay);
