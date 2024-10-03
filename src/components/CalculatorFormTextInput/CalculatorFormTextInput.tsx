import React from "react";
import './CalculatorFormTextInput.scss';

interface ICalculatorFormTextInputProps {
    label: string;
    inputName: string;
    inputType: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isIncome?: boolean;
}

interface ICalculatorFormTextInputState {
    inputValue: string;
    isError: boolean;
}

export default class CalculatorFormTextInput extends React.Component<ICalculatorFormTextInputProps, ICalculatorFormTextInputState> {
    constructor(props: ICalculatorFormTextInputProps) {
        super(props);
        this.state = {
            inputValue: '',
            isError: false,
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value.replace(/[^0-9]/g, '');
        let isError = value.length > 14;

        if (this.props.isIncome) {
            isError = value === '' || value === '0' || value.length > 14;
        }

        this.setState({
            inputValue: value,
            isError: isError,
        });

        this.props.handleChange(event);
    };

    render(): JSX.Element {
        const inputId: string = `${this.props.inputName}-input`;
        const { inputValue, isError } = this.state;

        return (
            <>
                <div className="card__inputs-wrapper">
                    <label className="card__inputs-wrap__label">
                        {this.props.label}
                    </label>
                    <input
                        id={inputId}
                        onChange={this.handleInputChange}
                        name={this.props.inputName}
                        className={`${isError ? 'card__error' : 'card__inputs-item'}`}
                        type={this.props.inputType}
                        value={inputValue}
                    />
                </div>
                {isError && (
                    <label className="error-message" htmlFor={inputId}>
                        {this.props.isIncome
                            ? inputValue === ''
                                ? 'Pole nie może być puste'
                                : inputValue === '0'
                                    ? 'Dochód nie może wynosić 0'
                                    : 'Nie może być większe od 14 cyfr'
                            : 'Nie może być większe od 14 cyfr'}
                    </label>
                )}
            </>
        );
    }
}
