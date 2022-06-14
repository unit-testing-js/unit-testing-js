import { TestResult, TestTypeMap, Expect } from '../assets/type'
import { type } from 'rh-js-methods';

export function tobe(...args: any[]): TestResult {

	const { actual }: Expect = this

	if (!args || args.length < 1) {
		this.setType(TestTypeMap.noConformSpecValue)
		return this
	}

	if (args.length === 1) {
		this.expect = args[0]
		if (JSON.stringify(actual) === JSON.stringify(args[0])) {
			this.setType(TestTypeMap.Success)
			return this
		}
	}

	if (args.length > 1) {
		this.expect = args
		if (JSON.stringify(actual) === JSON.stringify(args)) {
			this.setType(TestTypeMap.Success)
			return this
		}
	}

	this.setType(TestTypeMap.noConformSpecValue)

	return this
}



export function tobes(args: any[]): TestResult {

	const { actual }: Expect = this
	this.expectType = 'Multivalued'

	if (!args || args.length < 1) {
		this.setType(TestTypeMap.noConformSpecValue)
		return this
	}

	if (args.length > 0) {
		this.expect = args
		if (args.filter(i => i === actual || (type(i) === 'RegExp' && i.test(String(actual)))).length) {
			this.setType(TestTypeMap.Success)
			return this
		}
	}

	this.setType(TestTypeMap.noConformSpecValue)

	return this
}