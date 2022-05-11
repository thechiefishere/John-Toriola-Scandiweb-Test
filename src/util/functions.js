/**
 * Returns the price of the product in the given currency
 * @param {The product whose price is required} product
 * @param {The amount should be returned in this currency} currencyInUse
 * @returns
 */
export const getPriceInSelectedCurrency = (product, currencyInUse) => {
    if (product === null || currencyInUse === '' || currencyInUse === null)
        return;
    const priceInSelectedCurrency = product.prices.find(
        (price) => currencyInUse === price.currency.symbol
    ).amount;
    return priceInSelectedCurrency;
};

/**
 * Return true if product is in cart
 * @param {id of the product} productId
 * @param {all items in cart} cartItems
 * @returns
 */
export const isProductInCart = (product, cartItems, attributes) => {
    const item = cartItems.find((item) => {
        if (
            item.product.id === product.id &&
      arrayEquality(item.productAttributes, attributes)
        )
            return item;
    });
    if (item) return true;

    return false;
};

/**
 * Returns updated cart items
 * @param {id of product to update} productId
 * @param {all items in cart} cartItems
 * @param {update to the product in cart} attributeToAdd
 * @returns
 */
export const getUpdatedCartItems = (product, cartItems, attributeToAdd) => {
    const items = cartItems.map((item) => {
        if (
            item.product.id === product.id &&
      arrayEquality(item.productAttributes, attributeToAdd)
        ) {
            item.productCount += 1;
            return item;
        }
        return item;
    });
    return items;
};

/**
 * Returns cartItems with update to a specific product
 * count.The count of a product is the number of the product
 * that is ordered.
 * @param {id of the product whose count is to be updated} productId
 * @param {new value of the product count} count
 * @returns
 */
export const getUpdatedCartItemsCount = (productId, position, items, count) => {
    items = items.map((item, index) => {
        if (item.product.id === productId && index === position)
            item.productCount = count;
        return item;
    });

    return items;
};

/**
 * Returns updated items with specified product removed
 * @param {id of the product to be removed from the cart} productId
 * @param {all items in the cart} items
 * @returns
 */
export const removeFromCart = (productId, position, items) => {
    items = JSON.parse(items).filter((item, index) => {
        if (item.product.id !== productId) return item;
        if (item.product.id === productId && position !== index) return item;
    });
    return items;
};

/**
 * Returns an array of all the first items in the products attributes.
 * @param {product whoose default attributes are to be returned} product
 * @returns
 */
export const defaultAttributes = (product) => {
    const defaults = product.attributes.map((attribute) => {
        return (
            attribute.items[0].value + '-' + attribute.type + '-' + attribute.name
        );
    });
    return defaults;
};

/**
 * Returns the total number of items in the
 * cart.
 * @param {All items in the cart} items
 * @returns
 */
export const totalItems = (items) => {
    if (items.length === 0) return 0;
    items = JSON.parse(items);
    const total = items.reduce((currentTotal, item) => {
        return (currentTotal += item.productCount);
    }, 0);
    return total;
};

/**
 * Returns true if all element in
 * b are in a
 * @param {firtst array} a
 * @param {second array} b
 * @returns
 */
const checkEveryElement = (a, b) => {
    return a.every((v, i) => isEqual(v, b[i]));
};

/**
 * Returns true if both array are
 * the same in length and values.
 * @param {first array} a
 * @param {second array} b
 */
export const arrayEquality = (a, b) => {
    if (a.length === b.length && checkEveryElement(a, b)) return true;
    return false;
};

const isEqual = (obj1, obj2) => {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length != props2.length) {
        return false;
    }
    for (var i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2);
        if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
            return false;
        }
    }
    return true;
};
const isObject = (object) => {
    return object != null && typeof object === 'object';
};

export const getAllAttributes = (products) => {
    const allAttributes = [];
    products.forEach((product) =>
        product.attributes.forEach((attribute) => {
            allAttributes.push(attribute);
        })
    );
    return allAttributes;
};

export const getAllOfType = (type, attributes, usedAttributes) => {
    if (!usedAttributes.includes(type)) return [];
    // console.log('attributes in getAllOf', attributes);
    const allOfType = new Set(
        attributes.map((val) => {
            // val.map()
            // console.log('items in map', val);
            if (val.name === type) return val.items.map((item) => item.value);
        })
    );
    return allOfType;
};

export const getAllAttributeSetAndName = (products) => {
    const attributes = getAllAttributes(products);
    const usedAttributes = [];
    const allAttributeSet = [];
    attributes.forEach((attribute) => {
        const set = [];
        if (!usedAttributes.includes(attribute.name)) {
            attributes.forEach((val) => {
                if (val.name === attribute.name) {
                    val.items.forEach((item) => {
                        if (!set.includes(item.value)) set.push(item.value);
                    });
                }
            });
            allAttributeSet.push(set);
            usedAttributes.push(attribute.name);
        }
    });
    return [allAttributeSet, usedAttributes];
};

export const filterProducts = (products, filters) => {
    const adjustedFilters = adjustFilters(filters);
    if (adjustedFilters.length === 0) return products;
    let remainingProducts = [];
    adjustedFilters.forEach((filter) => {
        const attributeName = filter.attributeName;
        const attributeValue = filter.attributeValue;
        products.forEach((product) => {
            product.attributes.forEach((attribute) => {
                if (attribute.name === attributeName) {
                    attribute.items.forEach((item) => {
                        if (item.value === attributeValue) remainingProducts.push(product);
                    });
                }
            });
        });
        products = remainingProducts;
        remainingProducts = [];
    });
    return products;
};

export const adjustFilters = (filters) => {
    const adjustedFilters = filters.filter(
        (filter) => filter.attributeValue !== 'All'
    );
    return adjustedFilters;
};

export const getQueryParameters = (search) => {
    const searchParams = new URLSearchParams(search);
    const queryString = [];
    for (var pair of searchParams.entries()) {
        queryString.push({
            attributeName: pair[0],
            attributeValue: pair[1],
        });
    }
    return queryString;
};

export const getFilterValuesFromQueryString = (search, presentFilterValues) => {
    const queryString = getQueryParameters(search);
    if (!arrayEquality(queryString, presentFilterValues)) return queryString;
    else return [];
};
