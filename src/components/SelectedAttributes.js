import React, { Component } from "react";
import { AppContext } from "../store/context";

export class SelectedAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      attributeState: [],
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    const items = this.context.cartItems;
    this.setAttributes(items);
  }

  setAttributes = (items) => {
    const item = items.find((item) => {
      const productId = item.split(" ")[0];
      if (productId === this.props.productId) return item;
    });
    let itemToArray = item.split(" ");
    itemToArray.shift();
    itemToArray.shift();
    let allAttribute = [];
    itemToArray.map((attributeSet) => {
      attributeSet
        .split("_")
        .forEach((attribute) => allAttribute.push(attribute));
    });
    // this.setAttributeState(itemToArray);
    this.setState({ attributes: allAttribute });
  };

  setAttributeState = (itemToArray) => {
    const initialState = [];
    itemToArray.forEach((item) => initialState.push(true));
    this.setState({ attributeState: initialState });
  };

  handleOnChange = (index) => {
    let attributeState = this.state.attributeState;
    attributeState[index] = !attributeState[index];
    this.setState({ attributeState: attributeState });
  };

  render() {
    return (
      <article className="selected-attributes-set">
        {this.state.attributes.map((attribute, index) => {
          const attributeValue = attribute.split("-")[0];
          const attributeType = attribute.split("-")[1];
          return (
            <div
              key={index}
              className={`attribute attribute--selected ${
                index === this.state.attributes.length - 1 && "shade"
              }`}
              style={{
                backgroundColor:
                  attributeType === "swatch" && `${attributeValue}`,
              }}
              onClick={(e) => {
                e.preventDefault();
                this.context.updateCartItemAttributeState(
                  this.props.productId,
                  index
                );
              }}
            >
              {attributeType === "text" && attributeValue}
            </div>
          );
        })}
      </article>
    );
  }
}

export default SelectedAttributes;
