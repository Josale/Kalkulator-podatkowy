import { calculateFlatTax, calculateRyczaltTax, calculateScaleTax } from './taxCalculations'

describe('calculateRyczaltTax', () => {
	it('should calculate the correct tax for income less than 60,000 zł', () => {
		expect(calculateRyczaltTax(50000, 0.1)).toBe(10033.52);
	});
	it('should calculate the correct tax for income greater than 60,000 zł', () => {
		expect(calculateRyczaltTax(70000, 0.1)).toBe(15389.32);
	});
	it('should calculate the correct tax for income greater than 300,000 zł', () => {
		expect(calculateRyczaltTax(310000, 0.1)).toBe(46100.68);
	});
});

describe('calculateFlatTax', () => {
	it('should calculate the correct tax for income less than 0 zł', () => {
		expect(calculateFlatTax(10000, 11000)).toBe(4581.36);
	});
	it('should calculate the correct tax for income grater than 1,000,000 zł', () => {
		expect(calculateFlatTax(1100000, 11000)).toBe(263831);
	});
	it('should calculate the correct tax for income grater than 0 but less than 1,000,000 zł', () => {
		expect(calculateFlatTax(100000, 20000)).toBe(19781.36);
	});
});

describe('calculateScaleTax', () => {
	it('should calculate the correct tax for income less than 0 zł', () => {
		expect(calculateScaleTax(100000, 110000)).toBe(4581.36);
	});
	it('should calculate the correct tax for income greater than 0 zł but less or equal than 120000', () => {
		expect(calculateScaleTax(100000, 20000)).toBe(10581.36);
	});
	it('should calculate the correct tax for income greater than 120000 zł but less or equal to 1000000', () => {
		expect(calculateScaleTax(180000, 20000)).toBe(29300);
	});
	it('should calculate the correct tax for income greater than 1000000 zł', () => {
		expect(calculateScaleTax(1100000, 20000)).toBe(408500);
	});
});
