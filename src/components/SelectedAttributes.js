import React, { Component } from 'react';
import { AppContext } from '../store/context';
import { bool, string, number, object } from 'prop-types';

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

    getSwatch = () => 'swatch';

    render() {
        const selectedAttributes = this.state.attributes;
        const mini = this.props.mini;
        const product = this.props.product;

        return (
            <article className="selected-attributes-set">
                {product.attributes.map((attribute, index) => (
                    <article key={index} className="attribute-container">
                        <h3 className="attribute-set__name">{attribute.name}:</h3>
                        <div className="attribute-set">
                            {attribute.items.map((item) => {
                                return (
                                    <div
                                        className={`attribute__wrap ${
                                            selectedAttributes.length > 0 &&
                      selectedAttributes[index].split('-')[0] === item.value &&
                      attribute.type === 'swatch' &&
                      'attribute__color--selected'
                                        }
                      ${mini && 'attribute__color--selected--mini'}`}
                                        key={item.id}
                                    >
                                        <div
                                            className={`attribute ${mini && 'attribute--mini'} ${
                                                attribute.type === 'swatch' && 'attribute__color'
                                            } ${
                                                attribute.type === 'swatch' &&
                        mini &&
                        'attribute__color--mini'
                                            }
                                            } ${
                                    selectedAttributes.length > 0 &&
                                              item.value ===
                                                selectedAttributes[index].split(
                                                    '-'
                                                )[0] &&
                                              attribute.type !== 'swatch' &&
                                              'attribute--clicked'
                                    } `}
                                            style={{
                                                backgroundColor:
                          attribute.type === 'swatch' ? item.value : 'none',
                                            }}
                                        >
                                            {attribute.type !== 'swatch' && item.value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </article>
                ))}
            </article>
        );
    }
}

SelectedAttributes.propTypes = {
    productId: string,
    position: number,
    mini: bool,
    product: object,
};

SelectedAttributes.defaultProps = {
    productId: '',
    position: 0,
    mini: false,
    product: {},
};

export default SelectedAttributes;
