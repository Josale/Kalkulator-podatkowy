import React, {Component} from "react";
import {ryczaltRates} from "../../utils/ryczaltRates.ts";

interface IRyczaltRateInputProps {
    label: string;
    inputName: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class RyczaltRateInput extends Component<IRyczaltRateInputProps> {

    render(): JSX.Element {
        return (
            <div className='card__inputs-wrapper'>
                <label className='card__inputs-wrap__label'>
                    {this.props.label}
                </label>
                <select
                    onChange={this.props.handleChange}
                    className='card__inputs-item'
                    name={this.props.inputName}
                >
                    {ryczaltRates.map((rate, index) => (
                        <option key={index} value={rate.value}>
                            {rate.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}