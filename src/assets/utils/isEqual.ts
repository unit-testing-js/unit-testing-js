import { CaseUnitType } from '../index'
import { equal, isArray, matchValue, type as _type } from 'rh-js-methods'

export function isEqual(value: any, afterValue: any, type: CaseUnitType): boolean {


	if (equal(value, afterValue)) {
		return true
	}

	if(type === 'Type' && _type(value) === _type(afterValue)){
		return true
	}

	if (type === 'Match' && matchValue(value, afterValue)) {
		return true
	}

	if (type === 'RegExp' && (afterValue as RegExp).test) {
		return (afterValue as RegExp).test(value)
	}

	return false
}


export function isEquals(
	value: any,
	afterValue: any,
	afterValues: any[],
	type: CaseUnitType
): boolean {
	if (afterValues && isArray(afterValues)) {
		return afterValues.filter(unit => isEqual(value, unit, type)).length > 0
	}

	return isEqual(value, afterValue, type)
}