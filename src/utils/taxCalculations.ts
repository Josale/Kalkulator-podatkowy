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

export const calculateFlatTax = (income: number, costs: number): number => {
	let flatIncome: number = income - costs;
	let flatTax: number = flatIncome * 0.19;
	let flatHealthContribution: number = Math.max(flatIncome * 0.049, 12 * 381.78);

	if(flatIncome < 0) {
		flatTax = 0;	
	}
	if(flatIncome > 1000000) {
		flatTax += (flatIncome - 1000000) * 0.04;
	}

	return flatTax + flatHealthContribution;
}

export const calculateScaleTax = (income: number, costs: number): number => {
	let scaleTax: number = 0;
	let scaleIncome: number = (income - costs) - 30000;
	let scaleHealthContribution: number = Math.max(scaleIncome * 0.09, 12 * 381.78);

	if(scaleIncome < 0) {
		scaleTax = 0;
	}	
	if(scaleIncome > 0 && scaleIncome <= 120000) {
		scaleTax = scaleIncome * 0.12;
	}	
	if(scaleIncome > 120000 && income <= 1000000) {
		scaleTax = (scaleIncome - 120000) * 0.32 + 120000 * 0.12;
	} 
	if(scaleIncome > 1000000) {
		scaleTax = (scaleIncome - 120000) * 0.32 + 120000 * 0.12 + (scaleIncome - 1000000) * 0.04;
	}

	return scaleTax + scaleHealthContribution;
}