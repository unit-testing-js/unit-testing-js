import { TestResult, Expect } from '../assets/type'
import { type } from 'rh-js-methods';

export function tobeRegExp(reg: RegExp): TestResult {

	const { actual='' }: Expect = this

	this.expectType = 'RegExp'
	this.expect = reg

	if (type(reg) === "RegExp") {
		if (reg.test(actual)) {
			this.setType('Success')
			return this
		}
	}

	this.setType('noConformSpecValue')

	return this
}

export function tobeRegExps(regs: RegExp[]): TestResult {

	const { actual='' }: Expect = this

	this.expectType = 'RegExps'
	this.expect = regs

	if (regs) {
		if (regs.filter(reg => reg.test(actual)).length > 0) {
			this.setType('Success')
			return this
		}

		return this
	}


	this.setType('noConformSpecValue')

	return this
}