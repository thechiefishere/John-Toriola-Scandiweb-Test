import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { allProductsQuery } from "../store/queries";

const client = clientClone();

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setAllProduct();
  }

  setAllProduct = async () => {
    const response = await client.post(allProductsQuery);
    this.setState({ allProducts: response.category.products });
  };
  render() {
    return (
      <section className="home">
        <h1>Category name</h1>
        <section className="products">
          {this.state.allProducts.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
        </section>
      </section>
    );
  }
}

export default Home;
