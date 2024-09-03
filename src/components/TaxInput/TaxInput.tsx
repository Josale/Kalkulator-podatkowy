import React, { ReactNode } from 'react'
import CalculateComponent from '../CalculateComponent'
import './TaxInput.scss'

interface TaxInputState {
  ryczaltRate: number;
	costs: number;
	income: number;
}

export default class TaxInput extends React.Component<{}, TaxInputState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ryczaltRate: 2,
			costs: 0,
			income: 0,
    };
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ ryczaltRate: Number(event.target.value) });
  }

	handleCostsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ costs: Number(event.target.value) })
	}

	handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ income: Number(event.target.value) })
	}

  render(): ReactNode {
    return (
      <>
        <div className="form-container">
          <div className="form-container__wrapper">
            <div className="form-container__wrapper__block">
              <label className="form-container__wrapper__block__label" htmlFor="income">Przychody za rok</label>
              <input onChange={this.handleIncomeChange} className="form-container__wrapper__block__input" type="number" id="income" placeholder="Wpisz tutaj swój dochód" />
            </div>
            <div className="form-container__wrapper__block">
              <label className="form-container__wrapper__block__label" htmlFor="costs">Koszty za rok</label>
              <input onChange={this.handleCostsChange} className="form-container__wrapper__block__input" type="number" id="costs" placeholder="Wpisz tutaj swoje koszty" />
            </div>
          </div>

          <label className="form-container__label" htmlFor="lump-sum">Procent ryczałtu</label>
          <select onChange={this.handleSelectChange} className="form-container__select" id="lump-sum" >
            <option value="0.02">2%</option>
            <option value="0.03">3%</option>
            <option value="0.055">5,5%</option>
            <option value="0.085">8,5%</option>
            <option value="0.1">10%</option>
            <option value="0.12">12%</option>
            <option value="0.125">12,5%</option>
            <option value="0.14">14%</option>
            <option value="0.15">15%</option>
            <option value="0.17">17%</option>
          </select>
        </div>
        <CalculateComponent ryczaltRate={this.state.ryczaltRate} income={this.state.income} costs={this.state.costs} />
      </>
    );
  }
}
