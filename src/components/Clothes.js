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
      this.setClothes(this.context.categories[1]);
    }
  }

  setClothes = async (category) => {
    const response = await client.post(categoryQuery(category));
    this.setState({ clothes: response.category.products });
  };
  render() {
    return (
      <div>
        {this.state.clothes !== null && (
          <section className="category">
            <h1 className="category__name">{this.context.categories[1]}</h1>
            <section className="category__products">
              {this.state.clothes.map((product) => {
                return <ProductTile key={product.id} product={product} />;
              })}
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Clothes;
