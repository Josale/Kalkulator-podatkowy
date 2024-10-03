import React from "react";
import CalculatorFormTextInput from "../CalculatorFormTextInput/CalculatorFormTextInput.tsx";
import RyczaltRateInput from "../RyczaltRateInput/RyczaltRateInput.tsx";
import taxCalculate, { Taxes } from "../../helpers/TaxCalculate.ts";

interface ICalculatorFormProps {
    isError: boolean;
    isErrorSecond: boolean;
    onResult: (result: Taxes) => void;
}

interface ICalculatorFormState {
    revenue: number;
    costs: number;
    ryczaltRate: number;
    [key: string]: unknown;
}

export default class CalculatorForm extends React.Component<ICalculatorFormProps, ICalculatorFormState> {
    constructor(props: ICalculatorFormProps) {
        super(props);
        this.state = {
            revenue: 0,
            costs: 0,
            ryczaltRate: 0.02,
        };
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        if (name) {
            this.setState({ [name]: value });
        }
    }

    calcBestOption = (): void => {
        const { revenue, costs, ryczaltRate } = this.state;
        const result = taxCalculate.taxCalculation(revenue, costs, ryczaltRate);

        if (this.props.onResult) {
            this.props.onResult(result);
        }
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.calcBestOption();
    };

    render(): JSX.Element {
        return (
            <form className="card__inputs" onSubmit={this.handleSubmit}>
                <CalculatorFormTextInput
                    label={"Przychody"}
                    inputName={"revenue"}
                    inputType={"text"}
                    handleChange={this.handleInput}
                    isIncome={true}
                />
                <CalculatorFormTextInput
                    label={"Koszty"}
                    inputName={"costs"}
                    inputType={"text"}
                    handleChange={this.handleInput}
                    isIncome={false}
                />
                <RyczaltRateInput
                    label={"Procent ryczałtu"}
                    inputName={"ryczaltRate"}
                    handleChange={this.handleInput}
                />
                <div className="card__result-button">
                    <button type="submit">Oblicz</button>
                </div>
            </form>
        );
    }
}
