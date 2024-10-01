import React from "react";
import CalculatorFormTextInput from "../CalculatorFormTextInput/CalculatorFormTextInput.tsx";
import RyczaltRateInput from "../RyczaltRateInput/RyczaltRateInput.tsx";
import taxCalculate, { Taxes } from "../../helpers/taxCalculate";

interface ICalculatorFormProps {
    isError: boolean;
    isErrorSecond: boolean;
    onResult: (result: Taxes) => void;
}

interface ICalculatorFormState {
    revenue: number;
    costs: number;
    ryczaltRate: number;
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

    handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({ revenue: Number(value) });
    };

    handleCostsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({ costs: Number(value) });
    };

    handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ ryczaltRate: Number(event.target.value) });
    };

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
                    inputName="income"
                    inputType={"number"}
                    handleChange={this.handleIncomeChange}
                    isIncome={true}
                />
                <CalculatorFormTextInput
                    label={"Koszty"}
                    inputName="costs"
                    inputType={"number"}
                    handleChange={this.handleCostsChange}
                    isIncome={false}
                />
                <RyczaltRateInput
                    label={"Procent ryczałtu"}
                    handleChange={this.handleSelectChange}
                />
                <div className="card__result-button">
                    <button type="submit">Oblicz</button>
                </div>
            </form>
        );
    }
}
