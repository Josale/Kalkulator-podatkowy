import React from 'react'
import { handleKeyPress } from '../../helpers/handleKeyPress'
import { TaxInputState } from '../../types/types'
import { calculateFlatTax } from '../../utils/CalculateFlatTax'
import { calculateRyczaltTax } from '../../utils/CalculateRyczaltTax'
import { calculateScaleTax } from '../../utils/CalculateScaleTax'
import { ryczaltRates } from '../../utils/ryczaltRates'
import './TaxInput.scss'

export default class TaxInput extends React.Component<{}, TaxInputState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			ryczaltRate: 0.02,
			costs: 0,
			income: 0,
			countOfRyczaltTax: 0,
			countOfFlatTax: 0,
			countOfScaleTax: 0,
			taxScaleOption: 0,
			taxFlatOption: 0,
			taxRyczaltOption: 0,
			bestOption: 0,
			bestOptionName: '',
			isBestOption: false,
			isError: false,
			isErrorSecond: false,
			isFocus: false,
			isFocusSecond: false,
			inputValue: '',
			inputValueSecond: '',
			errorMessage: '',
			errorMessageSecond: '',
		}
	}

	handleBlur = () => {
		const { inputValue } = this.state
		if (inputValue.length > 0) {
			return
		}
		this.setState({ isFocus: false })
	}

	handleBlurSecond = () => {
		const { inputValueSecond } = this.state
		if (inputValueSecond.length > 0) {
			return
		}
		this.setState({ isFocusSecond: false })
	}

	handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({ ryczaltRate: Number(event.target.value) })
	}

	handleCostsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		this.setState({ inputValueSecond: value })

		if (value.length <= 14) {
			this.setState({ isErrorSecond: false })
			this.setState({ costs: Number(value) })
		} else {
			this.setState({ isErrorSecond: true })
		}
	}

	handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		this.setState({ inputValue: value })

		if (value.length <= 14) {
			this.setState({ isError: false })
			this.setState({ income: Number(value) })
		} else {
			this.setState({ isError: true })
			this.setState({ income: 0 })
		}
	}

	calculateTaxes = () => {
		const { ryczaltRate, costs, income } = this.state
		return {
			countOfRyczaltTax: Math.round(calculateRyczaltTax(income, ryczaltRate)),
			countOfFlatTax: Math.round(calculateFlatTax(income, costs)),
			countOfScaleTax: Math.round(calculateScaleTax(income, costs)),
		}
	}

	calcBestOption = (): void => {
		if (!this.state.isErrorSecond) {
			const { income } = this.state

			if (income > 0) {
				const { countOfRyczaltTax, countOfFlatTax, countOfScaleTax } =
					this.calculateTaxes()

				let bestOption = Math.round(countOfRyczaltTax)
				let bestOptionName = 'ryczałt'

				if (countOfFlatTax < bestOption) {
					bestOption = Math.round(countOfFlatTax)
					bestOptionName = 'podatek liniowy'
				}

				if (countOfScaleTax < bestOption) {
					bestOption = Math.round(countOfScaleTax)
					bestOptionName = 'skala podatkowa'
				}

				this.setState({
					countOfRyczaltTax,
					countOfFlatTax,
					countOfScaleTax,
					bestOption,
					bestOptionName,
					isBestOption: true,
				})
			} else {
				this.setState({ isError: true })
			}
		}
	}

	render(): React.ReactNode {
		const {
			isBestOption,
			bestOptionName,
			bestOption,
			isError,
			isErrorSecond,
			isFocus,
			isFocusSecond,
			countOfRyczaltTax,
			countOfScaleTax,
			countOfFlatTax,
		} = this.state

		const remainingOptions = [
			{ name: 'podatek liniowy', value: countOfFlatTax },
			{ name: 'skala podatkowa', value: countOfScaleTax },
			{ name: 'ryczałt', value: countOfRyczaltTax },
		].filter(option => option.name !== bestOptionName)

		return (
			<div className='container'>
				<div className='card'>
					<div className='card__header'>Oblicz podatek</div>
					<div className='card__body'>
						<div className='card__inputs'>
							<div className='wrapper'>
								<div className='card__inputs-wrapper'>
									<span
										className={`${
											isFocus ? 'card__focused' : 'card__inputs-wrap__label'
										}`}
									>
										Przychody
									</span>
									<input
										onFocus={() => this.setState({ isFocus: true })}
										onBlur={this.handleBlur}
										onChange={this.handleIncomeChange}
										onKeyPress={handleKeyPress}
										className={`${
											isError ? 'card__error__income' : 'card__inputs-item'
										}`}
										type='number'
									/>
								</div>
								{this.state.inputValue.length > 14 && this.state.isError && (
									<span className='error-message'>
										można wpisać tylko 14 cyfr
									</span>
								)}
								{this.state.inputValue.length <= 0 && isError && (
									<span className='error-message'>
										liczba musi być większa od 0
									</span>
								)}
							</div>
							<div className='wrapper'>
								<div className='card__inputs-wrapper'>
									<span
										className={`${
											isFocusSecond
												? 'card__focused'
												: 'card__inputs-wrap__label'
										}`}
									>
										Ilość kosztów
									</span>
									<input
										onFocus={() => this.setState({ isFocusSecond: true })}
										onBlur={this.handleBlurSecond}
										onChange={this.handleCostsChange}
										onKeyPress={handleKeyPress}
										className={`${
											isErrorSecond ? 'card__error__costs' : 'card__inputs-item'
										}`}
										type='number'
									/>
								</div>
								{this.state.inputValueSecond.length >= 14 &&
									this.state.isErrorSecond && (
										<span className='error-message'>
											można wpisać tylko 14 cyfr
										</span>
									)}
							</div>
							<div className='card__inputs-wrapper'>
								<span className='card__inputs-wrap__label'>
									Procent ryczałtu
								</span>
								<select
									onChange={this.handleSelectChange}
									className='card__inputs-item'
								>
									{ryczaltRates.map((rate, index) => (
										<option key={index} value={rate.value}>
											{rate.label}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='card__result'>
							<div className='card__result-header'>
								<p>Podatek {bestOptionName} wynosi: </p>
								<h3>
									{bestOption} zł <span>to jest najlepsza opcja</span>
								</h3>
							</div>
							<hr />
							<div className='card__result-main'>
								{isBestOption &&
									remainingOptions.map((option, index) => (
										<div key={index} className='card__result-option'>
											<p>{option.name} wynosi:</p>
											<h3>{option.value} zł</h3>
										</div>
									))}
							</div>
							<div className='card__result-button'>
								<button onClick={this.calcBestOption}>Oblicz</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
