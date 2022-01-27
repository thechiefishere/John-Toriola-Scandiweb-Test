import React, { Component } from 'react';
import { object, func, array } from 'prop-types';

export class Attribute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedItem: -1,
        };
    }

    render() {
        const attribute = this.props.attribute;
        const clickedItem = this.state.clickedItem;
        const setSelectedAttributes = this.props.setSelectedAttributes;
        const attributeIndex = this.props.attributeIndex;
        const productName = this.props.productName;

        return (
            <article className="attribute-container">
                <h3 className="attribute-set__name">{attribute.name}:</h3>
                <div className="attribute-set">
                    {attribute.items.map((item, index) => {
                        return (
                            <div
                                className={`attribute ${
                                    clickedItem === index &&
                  attribute.type !== 'swatch' &&
                  'attribute--clicked'
                                } ${
                                    clickedItem === index &&
                  attribute.type === 'swatch' &&
                  'attribute--color'
                                } `}
                                key={item.id}
                                style={{
                                    backgroundColor:
                    attribute.type === 'swatch' ? item.value : 'none',
                                }}
                                onClick={() => {
                                    this.setState({ clickedItem: index });
                                    setSelectedAttributes(
                                        attributeIndex,
                                        item.value,
                                        attribute.type
                                    );
                                }}
                            >
                                <input
                                    type="radio"
                                    value={item.value}
                                    name={`${attribute.name}${productName}`}
                                    id={`${item.value}`}
                                    className="attribute__input"
                                />
                                <label className="attribute__label" htmlFor={`${item.value}`}>
                                    {attribute.type !== 'swatch' && item.value}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </article>
        );
    }
}

Attribute.propTypes = {
    attribute: array,
    setSelectedAttributes: func,
    attributeIndex: object,
    productName: object,
};

Attribute.defaultProps = {
    attribute: [],
    setSelectedAttributes: () => {},
    attributeIndex: {},
    productName: {},
};

export default Attribute;
