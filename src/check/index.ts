import { type } from "rh-js-methods"

export function isSpecifyValue(actualResults: any, args: any[]): boolean {

	this.expect = args

	if (args.includes(actualResults)) {
		this.setType.bind(this)('ConformSpecValue')
		return true
	}

	this.setType.bind(this)('NoConformSpecValue')

	return false
}

export function isTruthy(value: any): boolean {
	if (!value) return false
	if (type(value) === 'Number' && value < 0) return false
	return true
}

export function isFalse(value: any): boolean {
	return !value
}