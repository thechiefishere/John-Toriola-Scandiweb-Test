import { Field, Query } from "@tilework/opus";

export const allProductsQuery = new Query("category", true)
  .addArgument("input", "{title: 'all'}")
  .addField(
    new Field("products", true)
      .addField("id")
      .addField("name")
      .addField("gallery")
      .addField(
        new Field("prices", true)
          .addField("amount")
          .addField(new Field("currency").addField("symbol"))
      )
  );

export const currenciesQuery = new Query("currencies", true)
  .addField("symbol")
  .addField("label");
