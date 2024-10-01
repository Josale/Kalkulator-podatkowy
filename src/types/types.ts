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
  isErrorSecond: boolean;
  inputValue: string;
  inputValueSecond: string;
}