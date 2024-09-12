export const calculateRyczaltTax = (income: number, ryczaltRate: number): number => {
	const ryczaltTax: number = income * ryczaltRate;
	let healthContribution: number = 0;

	if(income <= 60000) {
		healthContribution = 12 * 419.46;
	}
	if(income > 60000 && ryczaltTax <= 300000) {
		healthContribution = 12 * 699.11;
	}
	if(income > 300000) {
		healthContribution = 12 * 1258.39;
	}
	
	return ryczaltTax + healthContribution;
}
