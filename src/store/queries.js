import { Field, Query } from "@tilework/opus";

export const allProductsQuery = new Query("category", true)
  .addArgument("input", "CategoryInput", { title: "all" })
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

export const clothesQuery = new Query("category", true)
  .addArgument("input", "CategoryInput", { title: "clothes" })
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

export const techQuery = new Query("category", true)
  .addArgument("input", "CategoryInput", { title: "tech" })
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

// export const productQuery = new Query("product")
//   .addArgument("id", "String!", productId)
//   .addField("name")
//   .addField("gallery")
//   .addField(
//     new Field("prices", true)
//       .addField("amount")
//       .addField(new Field("currency").addField("symbol"))
//   )
//   .addField(
//     new Field("attributes", true)
//       .addField("name")
//       .addField("type")
//       .addField(new Field("items").addField("displayValue"))
//   );

export const currenciesQuery = new Query("currencies", true)
  .addField("symbol")
  .addField("label");
