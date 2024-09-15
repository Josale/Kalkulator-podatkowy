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
	isBestOption: boolean;
}

export interface TaxInputState {
  ryczaltRate: number;
  costs: number;
  income: number;
  isBestOption: boolean;
  bestOptionName: string;
  bestOption: number;
  countOfRyczaltTax: number;
  countOfFlatTax: number;
  countOfScaleTax: number;
	isError: boolean;
}