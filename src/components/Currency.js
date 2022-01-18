import React, { Component } from "react";
import { AppContext } from "../store/context";

export class Currency extends Component {
  static contextType = AppContext;

  render() {
    const currency = this.context.currency;
    const showingCurrencyTab = this.context.showingCurrencyTab;
    const currencies = this.context.currencies;
    const changeCurrencyInUse = this.context.changeCurrencyInUse;

    return (
      <article>
        {currency !== null && (
          <article
            className={
              showingCurrencyTab
                ? "currencyTab show-currencyTab"
                : "currencyTab"
            }
            style={{
              height: showingCurrencyTab && `${currencies.length * 30}px`,
            }}
          >
            {currencies.map((currency, index) => {
              return (
                <p
                  key={index}
                  className="currencyType"
                  onClick={() => changeCurrencyInUse(currency.symbol)}
                >
                  {currency.symbol} {currency.label}
                </p>
              );
            })}
          </article>
        )}
      </article>
    );
  }
}

export default Currency;
