import { Expect } from './../expect';
import { TestResult, TestTypeMap } from '../type'

export function tobe(...args: any[]): TestResult {
	const { actualResults }: Expect = this

	if (!args || args.length < 1) {
		this.setType(TestTypeMap.noConformSpecValue)
		return this
	}

	if (args.length === 1) {
		this.expectedResults = args[0]
		if (JSON.stringify(actualResults) === JSON.stringify(args[0])) {
			this.setType(TestTypeMap.Success)
			return this
		}
	}

	if (args.length > 1) {
		this.expectedResults = args
		if (JSON.stringify(actualResults) === JSON.stringify(args)) {
			this.setType(TestTypeMap.Success)
			return this
		}
	}
	this.setType(TestTypeMap.noConformSpecValue)
	return this
}