import React, { Component } from 'react';
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

    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            const setAndName = getAllAttributeSetAndName(this.props.products);
            this.setState({
                attributeSets: setAndName[0],
                attributeNames: setAndName[1],
            });
        }
    }

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
                                        <input type="checkbox" />
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
                                        >
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
