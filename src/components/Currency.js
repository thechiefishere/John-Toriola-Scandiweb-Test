import React, { Component } from "react";
import { AppContext } from "../store/context";

export class Currency extends Component {
  static contextType = AppContext;
  render() {
    return (
      <div>
        {this.context.currency !== null && (
          <article
            className={
              this.context.showingCurrencyTab
                ? "currencyTab show-currencyTab"
                : "currencyTab"
            }
          >
            {this.context.currencies.map((currency, index) => {
              return (
                <p
                  key={index}
                  className="currencyType"
                  onClick={() =>
                    this.context.changeCurrencyInUse(currency.symbol)
                  }
                >
                  {currency.symbol} {currency.label}
                </p>
              );
            })}
          </article>
        )}
      </div>
    );
  }
}

export default Currency;
