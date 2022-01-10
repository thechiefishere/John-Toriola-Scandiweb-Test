import React, { Component } from "react";
import { AppContext } from "../store/context";

export class Currency extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(state) => {
          return (
            <article
              className={
                state.showingCurrencyTab
                  ? "currencyTab show-currencyTab"
                  : "currencyTab"
              }
            >
              {state.currencies.map((currency, index) => {
                return (
                  <p key={index}>
                    {currency.symbol} {currency.label}
                  </p>
                );
              })}
            </article>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Currency;
