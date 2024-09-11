export class CalculateRyczaltTax {
	income: number;
	ryczaltRate: number;

	constructor(income: number, ryczaltRate: number) {
		this.income = income;
		this.ryczaltRate = ryczaltRate;
	}

	 	calculateRyczaltTax = (): number => {
		const ryczaltTax: number = this.income * this.ryczaltRate;
		let healthContribution: number = 0;
	
		if(this.income <= 60000) {
			healthContribution = 12 * 419.46;
		}
		if(this.income > 60000 && ryczaltTax <= 300000) {
			healthContribution = 12 * 699.11;
		}
		if(this.income > 300000) {
			healthContribution = 12 * 1258.39;
		}
	
		return ryczaltTax + healthContribution;
	}
}