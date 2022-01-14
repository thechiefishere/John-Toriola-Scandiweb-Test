import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { categoryQuery } from "../store/queries";

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
    const response = await client.post(categoryQuery("all"));
    this.setState({ allProducts: response.category.products });
  };
  render() {
    return (
      <section className="category">
        <h1 className="category__name">category name</h1>
        <section className="category__products">
          {this.state.allProducts.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
        </section>
      </section>
    );
  }
}

export default Home;
