import { Query } from "@tilework/opus";

// export const allCategoriesQuery = new Query("categories", true)
//   .addField("name")
//   .addFieldList(new Product());

export const currenciesQuery = new Query("currencies", true)
  .addField("symbol")
  .addField("label");
