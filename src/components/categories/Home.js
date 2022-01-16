import React, { Component } from "react";
import { AppContext } from "../../store/context";
import ProductTile from "../ProductTile";
import { clientClone } from "../../store/context";
import { categoryQuery } from "../../store/queries";

const client = clientClone();

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      categories: [],
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setState({ categories: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categories !== this.context.categories) {
      this.setState({ categories: this.context.categories });
      this.setAllProduct(this.context.categories[0]);
    }
  }

  setAllProduct = async (category) => {
    if (category == null) return;
    const response = await client.post(categoryQuery(category));
    this.setState({ allProducts: response.category.products });
  };
  render() {
    return (
      <div>
        {this.state.allProducts !== null && (
          <section className="category">
            <h1 className="category__name">category name</h1>
            <section className="category__products">
              {this.state.allProducts.map((product) => {
                return <ProductTile key={product.id} product={product} />;
              })}
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Home;
