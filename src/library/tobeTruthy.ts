import { isSpecifyValue } from '../check';
import { TestResult } from '../assets/type';


// 有问题
export function tobeTruthy(...args: any[]): TestResult {
	const { actual }: TestResult = this as TestResult

	this.expectType = 'Truthy'
	
	if (isSpecifyValue.bind(this)(actual, args)) {
		return this
	}

	if (actual) {
		this.setType('Success')
		return this
	}

	this.setType('NoConformDefaultValue')

	return this
}