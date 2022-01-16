import { Field, Query } from "@tilework/opus";

export const categoryNamesQuery = new Query("categories", true).addField(
  "name"
);

export const categoryQuery = (category) => {
  const allProductsQuery = new Query("category", true)
    .addArgument("input", "CategoryInput", { title: category })
    .addField("name")
    .addField(
      new Field("products", true)
        .addField("id")
        .addField("name")
        .addField("gallery")
        .addField("inStock")
        .addField(
          new Field("prices", true)
            .addField("amount")
            .addField(new Field("currency").addField("symbol"))
        )
    );
  return allProductsQuery;
};

export const productQuery = (productId) => {
  const productQuery = new Query("product")
    .addArgument("id", "String!", productId)
    .addField("id")
    .addField("name")
    .addField("gallery")
    .addField("description")
    .addField("inStock")
    .addField(
      new Field("prices", true)
        .addField("amount")
        .addField(new Field("currency").addField("symbol"))
    )
    .addField(
      new Field("attributes", true)
        .addField("name")
        .addField("type")
        .addField(new Field("items").addField("value").addField("id"))
    );
  return productQuery;
};

export const currenciesQuery = new Query("currencies", true)
  .addField("symbol")
  .addField("label");
