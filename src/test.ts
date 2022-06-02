import { logResult } from './result';
import { ResultCodeError } from './expect';
import { TestResult, TestTotal } from './type'

export function test(name: string, ...resultlist: TestResult[]): TestTotal {

	const total = resultlist.length || 0
	const resultSuccess: TestResult[] = []
	const resultError: TestResult[] = []
	const resultWarning: TestResult[] = []

	for (let i = 0; i < resultlist.length; i++) {
		const { type }: TestResult = resultlist[i] || {}

		if (resultlist[i] && !resultlist[i].name) {
			resultlist[i].name = name + ':' + i
		}

		if (isNaN(Number(type))) {
			resultError.push(resultlist[i])
			continue;
		}

		if (/^0[0-9]{0,}$/.test(String(type))) {
			resultSuccess.push(resultlist[i])
			continue
		}

		if (/^1[0-9]{0,}$/.test(String(type))) {
			resultError.push(resultlist[i])
			continue
		}

		if (/^2[0-9]{0,}$/.test(String(type))) {
			resultWarning.push(resultlist[i])
			continue
		}

	}

	const res = {
		name,
		total,
		resultSuccess,
		resultError,
		resultWarning,
	}

	logResult(res)

	return res
}