import React from 'react'
import { TaxInputState } from '../../types/types'
import { calculateFlatTax } from '../../utils/CalculateFlatTax'
import { calculateRyczaltTax } from '../../utils/CalculateRyczaltTax'
import { calculateScaleTax } from '../../utils/CalculateScaleTax'
import { ryczaltRates } from '../../utils/ryczaltRates'
import './TaxInput.scss'

export default class TaxInput extends React.Component<{}, TaxInputState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ryczaltRate: 0.02,
      costs: 0,
      income: 0,
      countOfRyczaltTax: 0,
      countOfFlatTax: 0,
      countOfScaleTax: 0,
      bestOption: 0,
      bestOptionName: '',
      isBestOption: false,
      isError: false,
    };
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ ryczaltRate: Number(event.target.value) });
  };

  handleCostsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ costs: Number(event.target.value) });
  };

  handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 13) {
        this.setState({ isError: false });
        this.setState({ income: Number(value) });
    } else {
        this.setState({ income: 0 });
    }
};

  calculateTaxes = () => {
    const { ryczaltRate, costs, income } = this.state;
    return {
      countOfRyczaltTax: Math.round(calculateRyczaltTax(income, ryczaltRate)),
      countOfFlatTax: Math.round(calculateFlatTax(income, costs)),
      countOfScaleTax: Math.round(calculateScaleTax(income, costs)),
    };
  };

  calcBestOption = (): void => {
    const { income } = this.state;

    if(income > 0) {
    const { countOfRyczaltTax, countOfFlatTax, countOfScaleTax } = this.calculateTaxes();

    let bestOption = Math.round(countOfRyczaltTax);
    let bestOptionName = 'Ryczałt';

    if (countOfFlatTax < bestOption) {
      bestOption = Math.round(countOfFlatTax);
      bestOptionName = 'Podatek liniowy';
    }

    if (countOfScaleTax < bestOption) {
      bestOption = Math.round(countOfScaleTax);
      bestOptionName = 'Podatek skalowy';
    }

    this.setState({
      countOfRyczaltTax,
      countOfFlatTax,
      countOfScaleTax,
      bestOption,
      bestOptionName,
      isBestOption: true,
    }); 
  } else {
    const { isBestOption } = this.state;
    this.setState({ isError: true });
    if(isBestOption === true) {
       this.setState({ isBestOption : false });
    };
  };
};

  render(): React.ReactNode {
    const { isBestOption, bestOptionName, bestOption, isError } = this.state;

    return (
      <div className='tax-calc-container'>
        <div className="tax-calc">
          <div className="tax-calc__heading">Oblicz podatek</div>
          <div className="tax-calc__body">
            <div className="tax-calc__inputs-wrap">
              <label className="tax-calc__label" htmlFor="revenue">Przychody</label>
              <input
                onChange={this.handleIncomeChange}
                className={isError ? "tax-calc__error" : "tax-calc__inputs-item" }
                type="number"
                id="revenue" />
              <label className="tax-calc__label" htmlFor="costs">Ilość kosztów</label>
              <input
                onChange={this.handleCostsChange}
                className={isError ? "tax-calc__error" : "tax-calc__inputs-item"}
                type="number"
                id="costs" />
              <label className="tax-calc__label" htmlFor="lump-sum">Procent ryczałtu</label>
              <select
                onChange={this.handleSelectChange}
                className="tax-calc__inputs-item"
                id="lump-sum">
                {ryczaltRates.map((rate, index) => (
                  <option key={index} value={rate.value}>{rate.label}</option>
                ))}
              </select>
            </div>
            <div className="tax-calc__result-wrap">
              <div className="tax-calc__result-wrap__result">
                <p className='tax-calc__header-info'>Najlepszą opcją dla ciebie jest:</p>
                {isBestOption && (
                  <>
                  <div className="tax-calc-button-wrapper">
                    <div className='tax-calc__main-info'>{bestOptionName} o wysokości: {bestOption} zł</div>
                  </div>
                  <p className='tax-calc__header-info'>Wszystkie opcje:</p>
                  <div className='tax-calc__footer-info'>Ryczałt o wysokości: {this.state.countOfRyczaltTax} zł</div>
                  <div className='tax-calc__footer-info'>Podatek liniowy o wysokości: {this.state.countOfFlatTax} zł</div>
                  <div className='tax-calc__footer-info'>Podatek skalowy o wysokości: {this.state.countOfScaleTax} zł</div>
                  </>
                )}
                <button
                  className='tax-calc-button__item'
                  type="submit"
                  onClick={this.calcBestOption}>Sprawdz</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
