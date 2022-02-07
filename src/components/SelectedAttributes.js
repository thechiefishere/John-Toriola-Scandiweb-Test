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
        const items = JSON.parse(this.context.cartItems) || [];
        this.setAttributes(items);
    }

    setAttributes = (items) => {
        const item = items.find((item, index) => {
            if (
                item.product.id === this.props.productId &&
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
                    const attributeName = attribute.split('-')[2];
                    return (
                        <article className="attribute__container" key={index}>
                            <h3 className="attribute__name">{attributeName}: </h3>
                            <div
                                htmlFor={`${attribute.value}`}
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
                        </article>
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
