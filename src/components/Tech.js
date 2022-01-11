import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { categoryQuery } from "../store/queries";

const client = clientClone();

export class Tech extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tech: [],
      categoryName: "",
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setTech();
  }

  setTech = async () => {
    const response = await client.post(categoryQuery("tech"));
    this.setState({ tech: response.category.products });
    this.setState({ categoryName: response.category.name });
  };
  render() {
    return (
      <section className="tech">
        <h1 className="category-name">{this.state.categoryName}</h1>
        <section className="products">
          {this.state.tech.map((product) => {
            return <ProductTile key={product.id} product={product} />;
          })}
        </section>
      </section>
    );
  }
}

export default Tech;
