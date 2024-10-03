import { RyczaltHealthContributionRate } from '../dictionaries/RyczaltHealthContributionRate'

export const calculateRyczaltTax = (income: number, ryczaltRate: number): number => {
	const firstTaxBracket = 60000;
	const secondTaxBracket = 300000;
	const ryczaltTax: number = income * ryczaltRate;
	let healthContribution: number = 0;

	if(income <= firstTaxBracket) {
		healthContribution = 12 * RyczaltHealthContributionRate.Low;
	}
	if(income > firstTaxBracket && ryczaltTax <= secondTaxBracket) {
		healthContribution = 12 * RyczaltHealthContributionRate.Medium;
	}
	if(income > secondTaxBracket) {
		healthContribution = 12 * RyczaltHealthContributionRate.High;
	}
	
	return Math.round(ryczaltTax + healthContribution);
}
