import React, { Component } from 'react';
import { object, func, number } from 'prop-types';

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

        return (
            <article className="attribute-container">
                <h3 className="attribute-set__name">{attribute.name}:</h3>
                <div className="attribute-set">
                    {attribute.items.map((item, index) => {
                        return (
                            <div
                                className={`attribute__wrap ${
                                    clickedItem === index &&
                  attribute.type === 'swatch' &&
                  'attribute__color--selected'
                                }`}
                                key={item.id}
                            >
                                <div
                                    className={`attribute ${
                                        attribute.type === 'swatch' && 'attribute__color'
                                    } ${
                                        clickedItem === index &&
                    attribute.type !== 'swatch' &&
                    'attribute--clicked'
                                    }`}
                                    style={{
                                        backgroundColor:
                      attribute.type === 'swatch' ? item.value : 'none',
                                    }}
                                    onClick={() => {
                                        this.setState({ clickedItem: index });
                                        setSelectedAttributes(
                                            attributeIndex,
                                            item.value,
                                            attribute.type,
                                            attribute.name
                                        );
                                    }}
                                >
                                    {attribute.type !== 'swatch' && item.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>
        );
    }
}

Attribute.propTypes = {
    attribute: object,
    setSelectedAttributes: func,
    attributeIndex: number,
    productName: object,
};

Attribute.defaultProps = {
    attribute: {},
    setSelectedAttributes: () => {},
    attributeIndex: 0,
    productName: {},
};

export default Attribute;
