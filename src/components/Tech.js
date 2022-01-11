import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";
import { clientClone } from "../store/context";
import { techQuery } from "../store/queries";

const client = clientClone();

export class Tech extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tech: [],
    };
  }

  static contextType = AppContext;
  componentDidMount() {
    this.setTech();
  }

  setTech = async () => {
    const response = await client.post(techQuery);
    this.setState({ tech: response.category.products });
  };
  render() {
    return (
      <section className="home">
        <h1>Category name</h1>
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
