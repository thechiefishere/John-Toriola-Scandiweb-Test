import React, { Component } from 'react';
import { AppContext } from '../../store/context';
import ProductTile from '../ProductTile';
import { withRouter } from '../../util/withRouter';
import { object } from 'prop-types';
import Filter from '../Filter';
import { arrayEquality, getQueryParameters } from '../../util/functions';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filteredProducts: [],
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
        if (prevState.products !== this.context.products)
            this.setState({ products: this.context.products });

        if (
            !arrayEquality(prevState.filteredProducts, this.context.filteredProducts)
        ) {
            this.setState({ filteredProducts: this.context.filteredProducts });
        }

        const queryString = getQueryParameters(location.search);
        if (!arrayEquality(queryString, this.context.filterValues)) {
            this.context.setFilterValues(queryString);
        }
    }

    render() {
        const products = this.state.products;
        const categoryName = this.state.categoryName;
        const filteredProducts = this.state.filteredProducts;

        return (
            <div>
                {filteredProducts !== null && (
                    <section className="category">
                        <Filter products={products} />
                        <main className="category__main">
                            <h1 className="category__name">{categoryName || 'All'}</h1>
                            <section className="category__products">
                                {filteredProducts.map((product) => {
                                    return <ProductTile key={product.id} product={product} />;
                                })}
                            </section>
                        </main>
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
