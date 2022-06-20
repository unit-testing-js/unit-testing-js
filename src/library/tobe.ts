import { TestResult, Expect } from '../assets/type'
import { type, equal } from 'rh-js-methods';

export function tobe(...args: any[]): TestResult {

	const { actual }: Expect = this

	if (!args || args.length < 1) {
		this.setType('NoConformSpecValue')
		return this
	}

	if (args.length === 1) {
		this.expect = args[0]
		if (equal(actual, args[0])) {
			this.setType('Success')
			return this
		}
	}

	if (args.length > 1) {
		this.expect = args
		if (equal(actual, args)) {
			this.setType('Success')
			return this
		}
	}

	this.setType('NoConformSpecValue')

	return this
}



export function tobes(args: any[]): TestResult {

	const { actual }: Expect = this
	this.expectType = 'Multivalued'

	if (!args || args.length < 1) {
		this.setType('NoConformSpecValue')
		return this
	}

	if (args.length > 0) {
		this.expect = args
		if (args.filter(i => i === actual || (type(i) === 'RegExp' && i.test(String(actual)))).length) {
			this.setType('Success')
			return this
		}
	}

	this.setType('NoConformSpecValue')

	return this
}