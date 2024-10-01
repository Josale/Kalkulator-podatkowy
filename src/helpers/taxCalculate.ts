import {calculateRyczaltTax} from "../utils/CalculateRyczaltTax";
import {calculateFlatTax} from "../utils/CalculateFlatTax";
import {calculateScaleTax} from "../utils/CalculateScaleTax";

export interface Taxes {
    lumpSum: number;
    flatTax: number;
    scaleTax: number;
    bestOption: number;
    bestOptionName: string;
    isBestOption: boolean;
    isErrorRevenue: boolean,
    isErrorExpenses: boolean,
}

export default class taxCalculate {
    public static taxCalculation(revenue: number, costs: number, ryczaltRate: number): Taxes {
        const ryczalt = Math.round(calculateRyczaltTax(revenue, ryczaltRate))
        const flat = Math.round(calculateFlatTax(revenue, costs))
        const scale = Math.round(calculateScaleTax(revenue, costs))
        let bestOption
        let bestOptionName
        if(revenue > 0 && String(revenue).length <= 14) {
            if(String(costs).length > 14) {
                return <Taxes> {
                    isErrorExpenses: true,
                }
            }
             bestOption = ryczalt;
             bestOptionName = 'ryczałt';

            if (flat < bestOption) {
                bestOption = flat;
                bestOptionName = 'podatek liniowy';
            }

            if (scale < bestOption) {
                bestOption = scale;
                bestOptionName = 'skala podatkowa';
            }
        } else {
            return <Taxes> {
                isErrorRevenue: true,
            }
        }
        return <Taxes> {
            lumpSum: ryczalt,
            flatTax: flat,
            scaleTax: scale,
            bestOption: bestOption,
            bestOptionName: bestOptionName,
            isBestOption: true,
        }
    }

}

