export interface CalculateComponentProps {
	ryczaltRate: number;
	costs: number;
	income: number;
}

export interface CalculateComponentState {
	countOfRyczaltTax: number;
	countOfFlatTax: number;
	countOfScaleTax: number;
	bestOption: number;
	bestOptionName: string;
	checkBestOption: boolean;
}