import React, { Component } from "react";
import { AppContext } from "../../store/context";
import ProductTile from "../ProductTile";
import { clientClone } from "../../store/context";
import { categoryQuery } from "../../store/queries";
import { withRouter } from "../../util/withRouter";

const client = clientClone();

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categoryName: "",
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    const category = this.props.location.pathname.slice(1);
    this.setState({ categoryName: category });
    this.setProducts(category);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const category = this.props.location.pathname.slice(1);
      this.setState({ categoryName: category });
      this.setProducts(category);
    }
  }

  setProducts = async (category) => {
    const response = await client.post(categoryQuery(category));
    this.setState({ products: response.category.products });
  };

  render() {
    const products = this.state.products;

    return (
      <div>
        {this.state.allProducts !== null && (
          <section className="category">
            <h1 className="category__name">
              {this.state.categoryName || "All"}
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

export default withRouter(Home);
