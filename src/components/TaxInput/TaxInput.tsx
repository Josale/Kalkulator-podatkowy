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
      checkBestOption: false,
    };
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ ryczaltRate: Number(event.target.value) });
  };

  handleCostsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ costs: Number(event.target.value) });
  };

  handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ income: Number(event.target.value) });
  };

  calculateTaxes = () => {
    const { ryczaltRate, costs, income } = this.state;
    return {
      countOfRyczaltTax: calculateRyczaltTax(income, ryczaltRate),
      countOfFlatTax: calculateFlatTax(income, costs),
      countOfScaleTax: calculateScaleTax(income, costs),
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
      checkBestOption: true,
    }); 
  } else {
    const { checkBestOption } = this.state;
    if(checkBestOption === true) {
       this.setState( { checkBestOption : false } ) 
    }
  }
};

  render(): React.ReactNode {
    const { checkBestOption, bestOptionName, bestOption } = this.state;

    return (
      <div>
        <div className="tax-calc">
          <div className="tax-calc__heading">Oblicz podatek</div>
          <div className="tax-calc__body">
            <div className="tax-calc__inputs-wrap">
              <label className="tax-calc__label" htmlFor="revenue">Przychody</label>
              <input
                onChange={this.handleIncomeChange}
                className="tax-calc__inputs-item"
                type="number"
                id="revenue" />
              <label className="tax-calc__label" htmlFor="costs">Ilość kosztów</label>
              <input
                onChange={this.handleCostsChange}
                className="tax-calc__inputs-item"
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
                <br />
                {checkBestOption ? (
                  <div className="tax-calc-button-wrapper">
                    <b className='tax-calc__main-info'>{bestOptionName}</b> <br />
                    <p className='tax-calc__footer-info'>{bestOption} zł</p>
                  </div>
                ) :
                <div className="tax-calc-button-wrapper">
                    <b className='tax-calc__main-info'>Podaj poprawne dane</b> <br />
                    <p className='tax-calc__footer-info'>0 zł</p>
                </div> }
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
  }
}
