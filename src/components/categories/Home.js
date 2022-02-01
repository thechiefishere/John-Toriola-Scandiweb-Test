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
        const location = this.props.location.pathname.slice(1);
        const category = location === '' ? 'all' : location;
        this.setState({ categoryName: category });
        this.context.changeCategoryName(category);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const category = this.props.location.pathname.slice(1);
            this.setState({ categoryName: category });
            this.context.changeCategoryName(category);
        }
        if (prevState.products !== this.context.products) {
            this.setState({ products: this.context.products });
        }
    }

    setCategory = () => {};

    render() {
        const products = this.state.products;
        const categoryName = this.state.categoryName;

        return (
            <div>
                {this.state.allProducts !== null && (
                    <section className="category">
                        <h1 className="category__name">{categoryName || 'All'}</h1>
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
