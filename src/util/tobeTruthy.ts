import { isSpecifyValue } from '../check';
import { TestResult, TestTypeMap } from '../type';

export function tobeTruthy(...args: any[]): TestResult {
	const { actualResults }: TestResult = this as TestResult

	if (isSpecifyValue.bind(this)(actualResults, args)) {
		return this
	}

	if (!!actualResults) {
		this.setType(TestTypeMap.Success)
		return this
	}
	
	this.setType(TestTypeMap.noConformDefaultValue)

	return this
}