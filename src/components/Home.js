import React, { Component } from "react";
import { AppContext } from "../store/context";
import ProductTile from "./ProductTile";

export class Home extends Component {
  render() {
    return (
      <section className="home">
        <h1>Category name</h1>
        <AppContext.Consumer>
          {(state) => {
            return (
              <section className="products">
                {state.allProducts.map((product) => {
                  return (
                    <ProductTile
                      key={product.id}
                      product={product}
                      currencyInUse={state.currencyInUse}
                    />
                  );
                })}
              </section>
            );
          }}
        </AppContext.Consumer>
      </section>
    );
  }
}

export default Home;
