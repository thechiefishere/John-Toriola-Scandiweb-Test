import React, { Component } from 'react';
import { AppContext } from '../store/context';
import { getAllAttributeSetAndName } from '../util/functions';
import { array } from 'prop-types';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributeSets: [],
            attributeNames: [],
        };
    }

    static contextType = AppContext;
    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            const setAndName = getAllAttributeSetAndName(this.props.products);
            this.setState({
                attributeSets: setAndName[0],
                attributeNames: setAndName[1],
            });
        }
    }

    handleInputChange = (filterName, value = 'Yes') => {
    // const filter =
    //   type === "checkbox" ? `${filterName}` : `${filterName} ${value}`;
        const filter = { attributeName: filterName, attributeValue: value };
        const inFilter = this.context.filterValues.find(
            (value) =>
                value.attributeName === filter.attributeName &&
        value.attributeValue === filter.attributeValue
        );
        if (inFilter) this.context.updateFilterValues(filter, 'REMOVE');
        else this.context.updateFilterValues(filter, 'ADD');
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
};

Filter.defaultProps = {
    products: [],
};

export default Filter;
