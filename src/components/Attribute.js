import React, { Component } from "react";

export class Attribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedItem: -1,
    };
  }

  render() {
    return (
      <article className="attribute-container">
        <h3 className="attribute-set__name">{this.props.attribute.name}:</h3>
        <div className="attribute-set">
          {this.props.attribute.items.map((item, index) => {
            return (
              <div
                className={`attribute ${
                  this.state.clickedItem === index &&
                  this.props.attribute.type !== "swatch" &&
                  "attribute--clicked"
                } ${
                  this.state.clickedItem === index &&
                  this.props.attribute.type === "swatch" &&
                  "attribute--color"
                } `}
                key={item.id}
                style={{
                  backgroundColor:
                    this.props.attribute.type === "swatch"
                      ? item.value
                      : "none",
                }}
                onClick={() => {
                  this.setState({ clickedItem: index });
                  this.props.setSelectedAttributes(
                    this.props.attributeIndex,
                    item.value,
                    this.props.attribute.type
                  );
                }}
              >
                {this.props.attribute.type !== "swatch" && item.value}
                <input
                  type="radio"
                  value={item.value}
                  name={`${this.props.attribute.name}${this.props.productName}`}
                  id={`${item.value}`}
                  className="attribute__input"
                />
              </div>
            );
          })}
        </div>
      </article>
    );
  }
}

export default Attribute;
