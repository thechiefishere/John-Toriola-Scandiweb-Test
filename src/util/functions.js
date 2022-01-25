/**
 * Splits the product name into two part, firstName and OtherNames
 * @param {The product whose name is to be splitted} product
 * @returns
 */
export const splitName = (product) => {
  if (product === null) return;
  const splittedName = product.name.split(" ");
  const firstName = splittedName.shift();
  if (splittedName.length <= 0)
    return [{ firstName: firstName, otherNames: "" }];
  const otherNames = splittedName.join(" ");
  return [{ firstName: firstName, otherNames: otherNames }];
};

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
export const isProductInCart = (productId, cartItems, attributes) => {
  const item = cartItems.find((item) => {
    const itemId = item.split(" ")[0];
    const itemAttributes = item.split(" ")[2];
    if (itemId === productId && attributes === itemAttributes) return item;
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
export const getUpdatedCartItems = (productId, cartItems, attributeToAdd) => {
  const items = cartItems.map((item) => {
    const itemId = item.split(" ")[0];
    const itemAttributes = item.split(" ")[2];
    if (itemId === productId && attributeToAdd === itemAttributes) {
      item = item.split(" ").map((val, index) => {
        if (index === 1) val = parseInt(val) + 1;
        return val;
      });
      item = item.join(" ");
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
export const getUpdatedCartItemsCount = (productId, items, count) => {
  items = items.map((item) => {
    let key = item.split(" ")[0];
    if (key === productId) {
      let itemToArray = item.split(" ");
      itemToArray.splice(1, 1);
      itemToArray.splice(1, 0, count);
      item = itemToArray.join(" ");
      return item;
    }
    return item;
  });
  // this.setState({ cartItems: items });
  // localStorage.setItem("cartItem", items);
  return items;
};

/**
 * Returns updated items with specified product removed
 * @param {id of the product to be removed from the cart} productId
 * @param {all items in the cart} items
 * @returns
 */
export const removeFromCart = (productId, items) => {
  items = items.filter((item) => {
    const key = item.split(" ")[0];
    if (key !== productId) return item;
  });
  return items;
};

/**
 * Returns the sum of all the items in cart
 * @param {all items in cart} items
 * @param {all products} products
 * @param {currency in use} currencyInUse
 * @returns
 */
export const getTotalAmountOfAllItemsInCart = (
  items,
  products,
  currencyInUse
) => {
  if (products === null || products === undefined) return;
  const total = items.reduce((total, item) => {
    const productId = item.split(" ")[0];
    const productCount = parseInt(item.split(" ")[1]);
    const product = products.find((product) => productId === product.id);
    const itemPrice = getPriceInSelectedCurrency(product, currencyInUse);
    return total + itemPrice * productCount;
  }, 0);

  return total;
};

export const defaultAttributes = (product) => {
  const defaults = product.attributes.map((attribute) => {
    return attribute.items[0].value + "-" + attribute.type;
  });
  return defaults;
};
