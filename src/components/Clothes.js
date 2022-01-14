import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { categoryQuery } from "../store/queries";

const client = clientClone();

export class Clothes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clothes: [],
      categoryName: "",
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setClothes();
  }

  setClothes = async () => {
    const response = await client.post(categoryQuery("clothes"));
    this.setState({ clothes: response.category.products });
    this.setState({ categoryName: response.category.name });
  };
  render() {
    return (
      <section className="category">
        <h1 className="category__name">{this.state.categoryName}</h1>
        <section className="category__products">
          {this.state.clothes.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
        </section>
      </section>
    );
  }
}

export default Clothes;
