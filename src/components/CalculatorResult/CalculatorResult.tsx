import React from "react";
import './CalculateResult.scss';
import gear from '../../assets/images/gear.png';

interface ICalculatorResultState {
    countOfFlatTax: number;
    countOfScaleTax: number;
    countOfRyczaltTax: number;
}

interface ICalculatorResultProps {
    countOfFlatTax: number;
    countOfScaleTax: number;
    countOfRyczaltTax: number;
    bestOptionName: string;
    bestOption: number;
    isBestOption: boolean;
}

export default class CalculatorResult extends React.Component<ICalculatorResultProps, ICalculatorResultState> {
    constructor(props: ICalculatorResultProps) {
        super(props);
        this.state = {
            countOfFlatTax: 0,
            countOfScaleTax: 0,
            countOfRyczaltTax: 0,
        };
    }

    render(): JSX.Element {
        const remainingOptions = [
            { name: 'podatek liniowy', value: this.props.countOfFlatTax },
            { name: 'skala podatkowa', value: this.props.countOfScaleTax },
            { name: 'ryczałt', value: this.props.countOfRyczaltTax },
        ].filter(option => option.name !== this.props.bestOptionName);

        return (
            <div className="card__result">
                {this.props.isBestOption ? (
                    <>
                        <div className="card__result-header">
                            <p>Podatek {this.props.bestOptionName} wynosi:</p>
                            <h3>
                                {this.props.bestOption} zł <span>to jest najlepsza opcja</span>
                            </h3>
                        </div>
                        <hr />
                        <div className="card__result-main">
                            {remainingOptions.map((option, index) => (
                                <div key={index} className="card__result-option">
                                    <p>{option.name} wynosi:</p>
                                    <h3>{option.value} zł</h3>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="card__result-error">
                        <img src={gear} alt="smth" width="40%" />
                    </div>
                )}
            </div>
        );
    }
}
