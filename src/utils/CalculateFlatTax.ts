

export const calculateFlatTax = (income: number, costs: number): number => {
	const flatIncome: number = income - costs;
	const flatHealthContribution: number = Math.max(flatIncome * 0.049, 12 * 381.78);
	let flatTax: number = flatIncome * 0.19;
	
	if(flatIncome < 0) {
		flatTax = 0;	
	}
	if(flatIncome > 1000000) {
		flatTax += (flatIncome - 1000000) * 0.04;
	}
	
	return Math.round(flatTax + flatHealthContribution);
}
