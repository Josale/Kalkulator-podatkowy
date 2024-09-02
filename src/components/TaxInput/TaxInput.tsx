import React, { ReactNode } from 'react'
import './TaxInput.scss'

export default class TaxInput extends React.Component {

	render(): ReactNode {
		return (
			<div className="form-container">
				<div className="form-container__wrapper">
					<div className="form-container__wrapper__block">
						<label className="form-container__wrapper__block__label" htmlFor="income">Przychody</label>
						<input className="form-container__wrapper__block__input" type="number" id="income" placeholder="Wpisz tutaj swój dochód" />
					</div>
					<div className="form-container__wrapper__block">
						<label className="form-container__wrapper__block__label" htmlFor="costs">Koszty</label>
						<input className="form-container__wrapper__block__input" type="number" id="costs" placeholder="Wpisz tutaj swoje koszty"/>
					</div>
				</div>

				<label className="form-container__label" htmlFor="lump-sum">Procent ryczałtu</label>
				<select className="form-container__select" id="lump-sum">
					<option value="2">2%</option>
					<option value="3">3%</option>
					<option value="5.5">5,5%</option>
					<option value="8.5">8,5%</option>
					<option value="10">10%</option>
					<option value="12">12%</option>
					<option value="12.5">12,5%</option>
					<option value="14">14%</option>
					<option value="15">15%</option>
					<option value="17">17%</option>
				</select>
			</div>
		);
	}
}