import React, { Component } from "react";

export class Attribute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="attribute">
        <h3 className="attribute-name">{this.props.attribute.name}:</h3>
        {this.props.attribute.type === "swatch" ? (
          <div className="attribute-item_set">
            {this.props.attribute.items.map((item, index) => {
              return (
                <button
                  key={index}
                  className="attribute-item attribute-item__swatch"
                  style={{ backgroundColor: item.displayValue }}
                ></button>
              );
            })}
          </div>
        ) : (
          <div className="attribute-item_set">
            {this.props.attribute.items.map((item, index) => {
              return (
                <button key={index} className="attribute-item">
                  {item.displayValue}
                </button>
              );
            })}
          </div>
        )}
      </article>
    );
  }
}

export default Attribute;
