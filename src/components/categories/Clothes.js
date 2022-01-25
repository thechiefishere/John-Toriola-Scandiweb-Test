import React, { Component } from "react";
import { AppContext } from "../../store/context";
import ProductTile from "../ProductTile";
import { clientClone } from "../../store/context";
import { categoryQuery } from "../../store/queries";
import { withRouter } from "../../util/withRouter";

const client = clientClone();

export class Clothes extends Component {
  constructor(props) {
    super(props);
    console.log("loc", this.props.location);
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
    if (category == null) return;
    const response = await client.post(categoryQuery(category));
    this.setState({ clothes: response.category.products });
  };

  render() {
    const categories = this.context.categories;
    const clothes = this.state.clothes;

    return (
      <div>
        {this.state.clothes !== null && (
          <section className="category">
            <h1 className="category__name">{categories[1]}</h1>
            <section className="category__products">
              {clothes.map((product) => {
                return <ProductTile key={product.id} product={product} />;
              })}
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default withRouter(Clothes);
