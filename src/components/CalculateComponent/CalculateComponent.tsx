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

	calcBestOption = (): void => {
		const { ryczaltRate, costs, income }: CalculateComponentProps = this.props;

		if(income >= 0 && costs >= 0) {
			const countOfRyczaltTax: number = calculateRyczaltTax(income, ryczaltRate);
			const countOfFlatTax: number = calculateFlatTax(income, costs);
			const countOfScaleTax: number = calculateScaleTax(income, costs);

			let bestOption: number = Math.round(countOfRyczaltTax);
			let bestOptionName: string = 'Ryczalt';

			if (countOfFlatTax < bestOption) {
				bestOption = Math.round(countOfFlatTax);
				bestOptionName = 'podatek liniowy';
			}

			if (countOfScaleTax < bestOption) {
				bestOption = Math.round(countOfScaleTax);
				bestOptionName = 'podatek skalowy';
			}

			this.setState({
				countOfRyczaltTax,
				countOfFlatTax,
				countOfScaleTax,
				bestOption,
				bestOptionName,
				checkBestOption: true,
			})
		}
	} 

	render(): React.ReactNode {

		return(
			<div>
				<div className='form-container__button'>
					<button className='form-container__button__item' type="submit" onClick={this.calcBestOption}>Sprawdz</button>
						{this.state.checkBestOption && (
							<div className="form-container__button__wrapper">
									Najlepszą opcją jest <b>{this.state.bestOptionName}</b> z podatkiem w wysokości {this.state.bestOption} zł.
							</div>
						)}
				</div>
			</div>
		);
	}
}