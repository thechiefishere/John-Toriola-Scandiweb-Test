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
    // console.log("i mounted selectedAttributes");
    const items = this.context.cartItems;
    this.setAttributes(items);
  }

  setAttributes = (items) => {
    const item = items.find((item) => {
      const productId = item.split(" ")[0];
      if (productId === this.props.productId) return item;
    });
    let itemArray = item.trim().split(" ");
    itemArray.shift();
    itemArray.shift();
    this.setAttributeState(itemArray);
    this.setState({ attributes: itemArray });
  };

  setAttributeState = (itemArray) => {
    const initialState = [];
    itemArray.forEach((item) => initialState.push(true));
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
              onClick={(e) => {
                e.preventDefault();
                this.context.updateCartItemAttributeState(
                  this.props.productId,
                  index
                );
              }}
            >
              <input
                type="checkbox"
                className="attribute-input"
                defaultChecked={this.state.attributeState[index]}
                onChange={() => {
                  this.handleOnChange(index);
                }}
              />
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
