import React, { Component } from 'react';
import { AppContext } from '../store/context';
import {
    getAllAttributeSetAndName,
    getQueryParameters,
} from '../util/functions';
import { array, object } from 'prop-types';
import { withRouter } from '../util/withRouter';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributeSets: [],
            attributeNames: [],
            categoryName: '',
            selectOption: 'All',
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.setState({ categoryName: this.context.categoryName });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            const setAndName = getAllAttributeSetAndName(this.props.products);
            this.setState({
                attributeSets: setAndName[0],
                attributeNames: setAndName[1],
            });
        }
        if (prevState.categoryName !== this.context.categoryName) {
            this.resetSelectTag();
            this.setState({ categoryName: this.context.categoryName });
        }
    }

    handleInputChange = (filterName, value = 'Yes') => {
        const filter = { attributeName: filterName, attributeValue: value };
        const inFilter = this.context.filterValues.find(
            (value) =>
                value.attributeName === filter.attributeName &&
        value.attributeValue === filter.attributeValue
        );
        if (inFilter) {
            this.context.updateFilterValues(filter, 'REMOVE');
            this.removeFromSearchParams(filterName, value);
        } else {
            this.context.updateFilterValues(filter, 'ADD');
            this.addToSearchParams(filterName, value, 'color');
        }
    };

    selectChange = (filterName, value) => {
        const filter = { attributeName: filterName, attributeValue: value };
        let currentFilter;
        const inFilter = this.context.filterValues.find((next) => {
            if (next.attributeName === filterName) {
                currentFilter = next;
                return next;
            }
        });
        if (inFilter) this.context.updateFilterValues(currentFilter, 'REMOVE');

        setTimeout(() => {
            this.context.updateFilterValues(filter, 'ADD');
        }, 1);
        this.setState({ selectOption: value });
        this.addToSearchParams(filterName, value, 'select');
    };

    resetSelectTag = () => {
        this.setState({ selectOption: 'All' });
    };

    addToSearchParams = (filterName, value, addType) => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        addType === 'select'
            ? params.set(filterName, value)
            : params.append(filterName, value);
        url.search = params.toString();
        window.history.pushState(null, '', url);
    };

    removeFromSearchParams = (filterName, value) => {
        let here = new URL(window.location.href);
        const updatedQuery = getQueryParameters(window.location.search).filter(
            (filter) =>
                filter.attributeName !== filterName || filter.attributeValue !== value
        );
        let queryToString = '';
        updatedQuery.forEach((query) => {
            queryToString = `${queryToString}${query.attributeName}=${query.attributeValue}&`;
        });
        queryToString = queryToString.substring(0, queryToString.length - 1);
        here.search = queryToString;
        window.history.pushState(null, '', here);
    };

    render() {
        const attributeSets = this.state.attributeSets;
        const attributeNames = this.state.attributeNames;

        return (
            <div>
                {attributeSets.length > 0 && (
                    <aside className="filter">
                        <h1 className="filter__heading">Filter</h1>

                        {attributeSets.map((set, index) => {
                            if (set[0] === 'Yes' || set[0] === 'No')
                                return (
                                    <div key={index} className="filter__element">
                                        <label>{attributeNames[index]}: </label>
                                        <input
                                            type="checkbox"
                                            name={attributeNames[index]}
                                            onChange={() => {
                                                this.handleInputChange(attributeNames[index]);
                                            }}
                                            checked={this.context.filterValues.some(
                                                (filter) =>
                                                    filter.attributeName === attributeNames[index]
                                            )}
                                        />
                                    </div>
                                );
                            else if (set[0].length === 7 && set[0].indexOf('#') !== -1) {
                                return (
                                    <div key={index} className="filter__element">
                                        <label>{attributeNames[index]}:</label>
                                        <div className="filter__box-container">
                                            {set.map((val, position) => {
                                                return (
                                                    <div
                                                        className="filter__box"
                                                        key={position}
                                                        style={{
                                                            backgroundColor: val,
                                                        }}
                                                        onClick={() =>
                                                            this.handleInputChange(
                                                                attributeNames[index],
                                                                val,
                                                                'color'
                                                            )
                                                        }
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="filter__element">
                                        <label htmlFor={attributeNames[index]}>
                                            {attributeNames[index]}:
                                        </label>
                                        <select
                                            name={attributeNames[index]}
                                            className="filter__input"
                                            value={this.state.selectOption}
                                            onChange={(e) =>
                                                this.selectChange(attributeNames[index], e.target.value)
                                            }
                                        >
                                            <option value={'All'}>All</option>
                                            {set.map((val, position) => {
                                                return (
                                                    <option key={position} value={val}>
                                                        {val}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                );
                            }
                        })}
                    </aside>
                )}
            </div>
        );
    }
}

Filter.propTypes = {
    products: array,
    location: object,
};

Filter.defaultProps = {
    products: [],
    location: {},
};

export default withRouter(Filter);
