import { isSpecifyValue } from '../check';
import { TestResult, TestTypeMap } from '../assets/type';

export function tobeTruthy(...args: any[]): TestResult {
	const { actual }: TestResult = this as TestResult

	if (isSpecifyValue.bind(this)(actual, args)) {
		return this
	}

	if (actual) {
		this.setType(TestTypeMap.Success)
		return this
	}

	this.setType(TestTypeMap.noConformDefaultValue)

	return this
}