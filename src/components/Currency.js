import React, { Component } from 'react';
import { AppContext } from '../store/context';
import { object } from 'prop-types';
import { withRouter } from '../util/withRouter';

export class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        };
    }
    static contextType = AppContext;
    componentDidMount() {
        const location = this.props.location.pathname;
        this.setState({ path: location });
    }

    componentDidUpdate() {
        if (this.state.path !== this.props.location.pathname) {
            this.context.closeCurrencyTab();
            this.setState({ path: this.props.location.pathname });
        }
    }

    render() {
        const currency = this.context.currency;
        const showingCurrencyTab = this.context.showingCurrencyTab;
        const currencies = this.context.currencies;
        const changeCurrencyInUse = this.context.changeCurrencyInUse;

        return (
            <article data-testid="currencyTab">
                {currency !== null && (
                    <article
                        className={
                            showingCurrencyTab
                                ? 'currencyTab show-currencyTab'
                                : 'currencyTab'
                        }
                        style={{
                            height: showingCurrencyTab && `${currencies.length * 45}px`,
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

Currency.propTypes = {
    location: object,
};

Currency.defaultProps = {
    location: {},
};

export default withRouter(Currency);
