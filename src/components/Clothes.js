import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { clothesQuery } from "../store/queries";

const client = clientClone();

export class Clothes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clothes: [],
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setClothes();
  }

  setClothes = async () => {
    const response = await client.post(clothesQuery);
    this.setState({ clothes: response.category.products });
  };
  render() {
    return (
      <section className="home">
        <h1>Category name</h1>
        <section className="products">
          {this.state.clothes.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
        </section>
      </section>
    );
  }
}

export default Clothes;
