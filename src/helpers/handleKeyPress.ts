import React from 'react'

export const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
	const charCode = event.charCode
	const currentValue = event.currentTarget.value

	if (
		(charCode >= 48 && charCode <= 57) ||
		charCode === 44 ||
		charCode === 46
	) {
		if (
			(currentValue.length === 0 && (charCode === 44 || charCode === 46)) ||
			(currentValue.split(/[,\.]/).length - 1 >= 1 &&
				(charCode === 44 || charCode === 46)) ||
			(currentValue.length > 0 &&
				(currentValue.slice(-1) === ',' || currentValue.slice(-1) === '.') &&
				(charCode === 44 || charCode === 46))
		) {
			event.preventDefault()
		}
	} else {
		event.preventDefault()
	}
}