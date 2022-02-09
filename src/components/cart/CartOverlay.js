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
        this.overlayRef = React.createRef();
    }
    static contextType = AppContext;

    componentDidMount() {
        const location = this.props.location.pathname;
        this.setState({ path: location });
        window.addEventListener('mousedown', this.handleMouseClick);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseClick);
    }

    handleMouseClick = (e) => {
        if (!this.overlayRef.current.contains(e.target)) {
            if (this.context.showingMiniCart) this.context.closeMiniCart();
        }
    };

    render() {
        const showingMiniCart = this.context.showingMiniCart;

        return (
            <section
                ref={this.overlayRef}
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
