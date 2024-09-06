import React from 'react'
import { CalculateComponentProps, CalculateComponentState } from '../../types/types'
import { calculateFlatTax, calculateRyczaltTax, calculateScaleTax } from '../../utils/taxCalculations'
import './CalculateComponent.scss'


export default class CalculateComponent extends React.Component<CalculateComponentProps, CalculateComponentState> {
	constructor(props: CalculateComponentProps) {
		super(props);
		this.state = {
			countOfRyczaltTax: 0,
			countOfFlatTax: 0,
			countOfScaleTax: 0,
			bestOption: 0,
			bestOptionName: '',
			checkBestOption: false,
		}
	}

	validationIncorrect = (): React.ReactNode => {
		const { income, costs }: CalculateComponentProps = this.props;

		if(income < 0 || costs < 0) {
			return(
				<>
					Your income or costs is incorrect
				</>
			);
		}
	}

	calcBestOption = (): void => {
		const { ryczaltRate, costs, income }: CalculateComponentProps = this.props;

		if(income > 0 && costs >= 0) {
			const countOfRyczaltTax = calculateRyczaltTax(income, ryczaltRate);
			const countOfFlatTax = calculateFlatTax(income, costs);
			const countOfScaleTax = calculateScaleTax(income, costs);

			console.log(countOfRyczaltTax + 'ryczalt');
			console.log(countOfFlatTax + 'Liniowka');
			console.log(countOfScaleTax + 'Skala');

			let bestOption = countOfRyczaltTax;
			let bestOptionName = 'Ryczalt';

			
			if (countOfFlatTax < bestOption) {
				bestOption = countOfFlatTax;
				bestOptionName = 'Flat Tax';
			}

			if (countOfScaleTax < bestOption) {
				bestOption = countOfScaleTax;
				bestOptionName = 'Scale Tax';
			}

			this.setState({
				countOfRyczaltTax,
				countOfFlatTax,
				countOfScaleTax,
				bestOption,
				bestOptionName,
				checkBestOption: true,
			})
		} else {
			this.validationIncorrect();
		}
	} 

	render(): React.ReactNode {

		return(
			<div>
			<div className='result-container'>
				<button type="submit" onClick={this.calcBestOption}>Sprawdz</button>
					{this.state.checkBestOption && (
						<div className="result-container__wrapper">
								Your best option is: {this.state.bestOptionName} with a tax of {this.state.bestOption} zł.
						</div>
					)}
					{this.validationIncorrect()}
			</div>
			</div>
			
		);
	}
}