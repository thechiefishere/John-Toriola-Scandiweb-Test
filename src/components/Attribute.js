import React, { Component } from "react";

export class Attribute extends Component {
  render() {
    return (
      <article className="attribute-container">
        <h3 className="attribute-name">{this.props.attribute.name}:</h3>
        <div className="attribute-set">
          {this.props.attribute.items.map((item) => {
            return (
              <div
                className="attribute"
                key={item.id}
                style={{
                  backgroundColor:
                    this.props.attribute.type === "swatch"
                      ? item.value
                      : "none",
                }}
                onClick={() =>
                  this.props.setSelectedAttributes(
                    item.value,
                    this.props.attribute.type
                  )
                }
              >
                <input
                  type="checkbox"
                  value={item.value}
                  name={`${this.props.attribute.name}${this.props.productName}`}
                  id={`${item.value}`}
                  className="attribute-input"
                />
                <label className="attribute-label" htmlFor={`${item.value}`}>
                  {this.props.attribute.type !== "swatch" && item.value}
                </label>
              </div>
            );
          })}
        </div>
      </article>
    );
  }
}

export default Attribute;
