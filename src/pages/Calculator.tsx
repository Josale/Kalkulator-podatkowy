import React from "react";
import CalculatorForm from "../components/CalculatorForm/CalculatorForm.tsx";
import CalculatorResult from "../components/CalculatorResult/CalculatorResult.tsx";
import Card from "../components/Card/Card.tsx";
import { Taxes } from "../helpers/TaxCalculate.ts";

interface ICalculatorState {
    taxResult: Taxes;
}

export default class Calculator extends React.Component<object, ICalculatorState> {
    constructor(props: object) {
        super(props);
        this.state = {
            taxResult: {
                lumpSum: 0,
                flatTax: 0,
                scaleTax: 0,
                bestOption: 0,
                bestOptionName: '',
                isBestOption: false,
                isErrorRevenue: false,
                isErrorExpenses: false,
            }
        };
    }

    handleResult = (result: Taxes): void => {
        this.setState({ taxResult: result });
    };

    render(): JSX.Element {
        return (
            <Card>
                <CalculatorForm
                    isError={this.state.taxResult.isErrorRevenue}
                    isErrorSecond={this.state.taxResult.isErrorExpenses}
                    onResult={this.handleResult}
                />
                <CalculatorResult
                    countOfFlatTax={this.state.taxResult.flatTax}
                    countOfScaleTax={this.state.taxResult.scaleTax}
                    countOfRyczaltTax={this.state.taxResult.lumpSum}
                    bestOptionName={this.state.taxResult.bestOptionName}
                    bestOption={this.state.taxResult.bestOption}
                    isBestOption={this.state.taxResult.isBestOption}
                />
            </Card>
        );
    }
}
