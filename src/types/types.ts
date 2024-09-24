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
  taxFlatOption: number;
  taxScaleOption: number;
  taxRyczaltOption: number;
	isError: boolean;
  isErrorSecond: boolean;
  isFocus: boolean;
  isFocusSecond: boolean;
  inputValue: string;
  inputValueSecond: string;
  errorMessage: string;
  errorMessageSecond: string;
}