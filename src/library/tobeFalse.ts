import { isFalse, isSpecifyValue } from '../check';
import { TestResult, TestTypeMap, Expect } from '../assets/type';

export function tobeFalse(...args: any[]): Expect {

	const { actual }: TestResult = this as TestResult

	this.expectType = 'False'

	if (isSpecifyValue.bind(this)(actual, args)) {
		return this
	}

	if (isFalse(actual)) {
		this.setType(TestTypeMap.Success)
		return this
	}

	this.setType(TestTypeMap.noConformDefaultValue)

	return this
}