import React, { Component } from "react";
import { AppContext } from "../store/context";

export class SelectedAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.setAttributes();
  }

  setAttributes = () => {
    const items = this.context.cartItems;
    const item = items.find((item) => {
      const productId = item.split(" ")[0];
      if (productId === this.props.productId) return item;
    });
    let itemArray = item.trim().split(" ");
    itemArray.shift();
    itemArray.shift();
    this.setState({ attributes: itemArray });
  };

  render() {
    return (
      <article className="selected-attributes-set">
        {this.state.attributes.map((attribute, index) => {
          const attributeValue = attribute.split("-")[1];
          const attributeType = attribute.split("-")[2];
          return (
            <div
              key={index}
              className="attribute"
              style={{
                backgroundColor:
                  attributeType === "swatch" && `${attributeValue}`,
              }}
              onClick={() =>
                this.context.updateCartItemAttributeState(
                  this.props.productId,
                  index
                )
              }
            >
              <input type="checkbox" className="attribute-input" />
              <label className="attribute-label">
                {attributeType === "text" && attributeValue}
              </label>
            </div>
          );
        })}
      </article>
    );
  }
}

export default SelectedAttributes;
