import React from 'react'

interface CalculateComponentProps {
	ryczaltRate: number;
	costs: number;
	income: number;
}

export default class CalculateComponent extends React.Component<CalculateComponentProps> {
	constructor(props: any) {
		super(props);
		this.state = {
			countOfRyczaltTax: 0,
			flatCountOfTax: 0,
		}
	}

	calcBestOption = (): void => {
		const { ryczaltRate, costs, income }: CalculateComponentProps = this.props;

		// Ryczałt

		const ryczaltTax = income * ryczaltRate;
		
		let healthContribution = 0;
		if(income <= 60000) {
			healthContribution = 12 * 419.46;
		}
		if(income > 60000 && income <= 300000) {
			healthContribution = 12 * 699.11;
		}
		if(income > 300000) {
			healthContribution = 12 * 1258.39;
		}

		const countOfRyczaltTax = ryczaltTax + healthContribution;
		this.setState({ countOfRyczaltTax : ryczaltTax + healthContribution })
		
		// Linówka

		let flatCountOfTax = 0;
		let flatHealthContribution = 0;
		let flatCosts = income - costs;
		let flatTax = flatCosts * 0.19;

		if((income * 0.049) >= 381.78) {
			flatHealthContribution = income * 0.049;
		} else {
			flatHealthContribution = 381.78;
		}
		if(income > 1000000) {
			flatTax += (income - 1000000) * 0.04;
		}
		
		this.setState({ flatCountOfTax : flatTax + flatHealthContribution })
		flatCountOfTax = flatTax + flatHealthContribution;

		// Skala

		let scaleCountOfTax = 0;
		let scaleTax = 0;
		let scaleIncome = income - costs;
		let scaleHealthContribution = 0;

		if(scaleIncome <= 120000) {
			scaleTax = (scaleIncome - 30000) * 0.12;
		}
		if(scaleIncome > 120000 && income <= 1000000) {
			scaleTax = (((scaleIncome - 30000) - 90000) * 0.32) + (90000 * 0.12);
		} 
		if(scaleIncome > 1000000) {
			scaleTax = (((scaleIncome - 30000) - 90000) * 0.32) + (90000 * 0.12) + ((scaleIncome - 1000000) * 0.04);
		}

		if((scaleIncome * 0.09) >= 381.78) {
			scaleHealthContribution = scaleIncome * 0.09;
		} else {
			scaleHealthContribution = 381.78;
		}

		scaleCountOfTax = scaleTax + scaleHealthContribution;
		this.setState({ scaleCountOfTax: scaleTax + scaleHealthContribution })

		console.log(ryczaltRate);
		console.log(income);
		console.log(costs);
		console.log(countOfRyczaltTax)
		console.log(flatCountOfTax)
		console.log(scaleCountOfTax)
	} 

	render(): React.ReactNode {

		return(
			<button type="submit" onClick={this.calcBestOption}>Sprawdz</button>
		);
	}
}