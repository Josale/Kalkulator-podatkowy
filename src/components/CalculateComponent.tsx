import React from 'react'
import { CalculateComponentProps, CalculateComponentState } from '../types/types'
import { calculateFlatTax, calculateRyczaltTax, calculateScaleTax } from '../utils/taxCalculations'

export default class CalculateComponent extends React.Component<CalculateComponentProps, CalculateComponentState> {
	constructor(props: CalculateComponentProps) {
		super(props);
		this.state = {
			countOfRyczaltTax: 0,
			countOfFlatTax: 0,
			countOfScaleTax: 0,
			bestOption: 0,
			checkBestOption: false,
		}
	}

	calcBestOption = (): void => {
		const { ryczaltRate, costs, income }: CalculateComponentProps = this.props;

		const countOfRyczaltTax = calculateRyczaltTax(income, ryczaltRate);
		const countOfFlatTax = calculateFlatTax(income, costs);
		const countOfScaleTax = calculateScaleTax(income, costs);

		const bestOption = Math.min(countOfRyczaltTax, countOfFlatTax, countOfScaleTax);
		console.log(bestOption);

		console.log(countOfRyczaltTax);
		console.log(countOfFlatTax);
		console.log(countOfScaleTax);

		this.setState({
			countOfRyczaltTax,
			countOfFlatTax,
			countOfScaleTax,
			bestOption,
			checkBestOption: true,
		})

	} 

	render(): React.ReactNode {

		return(
			<>
				<button type="submit" onClick={this.calcBestOption}>Sprawdz</button>
					{this.state.checkBestOption && (
						<div className="container">
								{this.state.bestOption}
						</div>
					)}
			</>
			
		);
	}
}