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
	
	return Math.round(scaleTax + scaleHealthContribution);
}