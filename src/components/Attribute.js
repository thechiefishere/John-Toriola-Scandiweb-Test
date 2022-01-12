import React, { Component } from "react";

export class Attribute extends Component {
  render() {
    return (
      <article className="attribute">
        <h3 className="attribute-name">{this.props.attribute.name}:</h3>
        <div className="attribute-item_set">
          {this.props.attribute.items.map((item, index) => {
            return (
              <button
                key={index}
                className={`attribute-item ${
                  this.props.attribute.type === "swatch" &&
                  "attribute-item__swatch"
                }`}
                style={{
                  backgroundColor:
                    this.props.attribute.type === "swatch"
                      ? item.value
                      : "none",
                }}
              >
                {this.props.attribute.type !== "swatch" && item.value}
              </button>
            );
          })}
        </div>
      </article>
    );
  }
}

export default Attribute;
