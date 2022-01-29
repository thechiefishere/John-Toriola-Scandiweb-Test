import React, { Component } from 'react';
import { AppContext } from '../../store/context';
import ProductTile from '../ProductTile';
import { withRouter } from '../../util/withRouter';
import { object } from 'prop-types';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categoryName: '',
        };
    }

    static contextType = AppContext;
    componentDidMount() {
        const category = this.props.location.pathname.slice(1);
        this.setState({ categoryName: category });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const category = this.props.location.pathname.slice(1);
            this.setState({ categoryName: category });
        }
        if (prevState.products !== this.context.products) {
            this.setState({ products: this.context.products });
        }
        if (prevState.categoryName !== this.context.categoryName) {
            this.context.changeCategoryName(this.state.categoryName);
        }
    }

    render() {
        const products = this.state.products;

        return (
            <div>
                {this.state.allProducts !== null && (
                    <section className="category">
                        <h1 className="category__name">
                            {this.state.categoryName || 'All'}
                        </h1>
                        <section className="category__products">
                            {products.map((product) => {
                                return <ProductTile key={product.id} product={product} />;
                            })}
                        </section>
                    </section>
                )}
            </div>
        );
    }
}

Home.propTypes = {
    location: object,
};

Home.defaultProps = {
    location: {},
};

export default withRouter(Home);
