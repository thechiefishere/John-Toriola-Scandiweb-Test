import React, { Component } from 'react';
import { AppContext } from '../store/context';
import { bool, string, number } from 'prop-types';

export class SelectedAttributes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: [],
            attributeState: [],
            numberOfAttributes: 0,
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        const items = this.context.cartItems;
        this.setAttributes(items);
    }

    setAttributes = (items) => {
        const item = items.find((item, index) => {
            if (
                item.productId === this.props.productId &&
        index === this.props.position
            )
                return item;
        });
        let numOfAttributes = item.productAttributes.length;
        const allAttribute = item.productAttributes.map((attribute) => attribute);
        this.setState({ numberOfAttributes: numOfAttributes });
        this.setState({ attributes: allAttribute });
    };

    render() {
        const attributes = this.state.attributes;
        const numberOfAttributes = this.state.numberOfAttributes;
        const mini = this.props.mini;

        return (
            <article className="selected-attributes-set">
                {attributes.map((attribute, index) => {
                    const attributeValue = attribute.split('-')[0];
                    const attributeType = attribute.split('-')[1];
                    return (
                        <div
                            key={index}
                            className={`attribute attribute--selected ${
                                index >= attributes.length - numberOfAttributes &&
                attributeType !== 'swatch' &&
                !mini &&
                'attribute--clicked'
                            }
              ${
                        index >= attributes.length - numberOfAttributes &&
                attributeType !== 'swatch' &&
                mini &&
                'attribute--clicked--mini'
                        }
               ${
                        index >= attributes.length - numberOfAttributes &&
                 attributeType === 'swatch' &&
                 'attribute--color'
                        }`}
                            style={{
                                backgroundColor:
                  attributeType === 'swatch' && `${attributeValue}`,
                            }}
                        >
                            {attributeType === 'text' && attributeValue}
                        </div>
                    );
                })}
            </article>
        );
    }
}

SelectedAttributes.propTypes = {
    productId: string,
    position: number,
    mini: bool,
};

SelectedAttributes.defaultProps = {
    productId: '',
    position: 0,
    mini: false,
};

export default SelectedAttributes;
