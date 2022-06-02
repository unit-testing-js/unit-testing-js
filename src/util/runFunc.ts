import { TestResult } from './../type';

export function runFunc(...args:any[]): TestResult {
	const { prototype, params = [] } = this as TestResult

	if (typeof prototype === 'function') {
		this.actualResults = prototype(...params, ...args)
	}
	
	return this
}