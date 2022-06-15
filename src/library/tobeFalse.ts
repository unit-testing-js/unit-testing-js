import { isFalse, isSpecifyValue } from '../check';
import { TestResult, Expect } from '../assets/type';

export function tobeFalse(...args: any[]): Expect {

	const { actual }: TestResult = this as TestResult

	this.expectType = 'False'

	if (isSpecifyValue.bind(this)(actual, args)) {
		return this
	}

	if (isFalse(actual)) {
		this.setType('Success')
		return this
	}

	this.setType('NoConformDefaultValue')

	return this
}