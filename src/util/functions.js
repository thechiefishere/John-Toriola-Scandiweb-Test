/**
 * Returns the price of the product in the given currency
 * @param {The product whose price is required} product
 * @param {The amount should be returned in this currency} currencyInUse
 * @returns
 */
export const getPriceInSelectedCurrency = (product, currencyInUse) => {
  if (product === null || currencyInUse === "" || currencyInUse === null)
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
  console.log("cartItems", cartItems);
  const item = cartItems.find((item) => {
    console.log("attributeToAdd", attributes);
    console.log("item.productAttributes", item.productAttributes);
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
      //   console.log("itemId", item.product.id);
      //   console.log("productId", product.id);
      //   console.log("attributeToAdd", attributeToAdd);
      //   console.log("item.productAttributes", item.productAttributes);
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
  items = items.filter((item, index) => {
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
    return attribute.items[0].value + "-" + attribute.type;
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
  const total = items.reduce((currentTotal, item) => {
    return (currentTotal += item.productCount);
  }, 0);
  return total;
};

export const getProductPrices = (product) => {
  const prices = product.prices.map((val) => {
    return {
      currency: val.currency.symbol,
      amount: val.amount,
    };
  });
  return prices;
};

/**
 * Returns true if all element in
 * b are in a
 * @param {firtst array} a
 * @param {second array} b
 * @returns
 */
const checkEveryElement = (a, b) => {
  return a.every((v, i) => v === b[i]);
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
