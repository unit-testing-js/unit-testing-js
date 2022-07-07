import { CaseUnitType } from '../index'
import { equal, isArray } from 'rh-js-methods'

export function isEqual(value: any, afterValue: any, type: CaseUnitType) {
	
	if (equal(value, afterValue)) {
		return true
	}

	if (type === 'RegExp') {
		return (afterValue as RegExp).test(value)
	}

	if (type === 'RegExps') {
		let list = []
		if (isArray(afterValue)) list = afterValue
		else list.push(afterValue)
		return list.filter(unit => {
			return (unit as RegExp).test(value)
		})
	}

	return false
}