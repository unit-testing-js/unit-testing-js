import { Mock } from "rh-mock"
import { isFunction, type } from "rh-js-methods"
import { TestResult } from "../assets/type"
import { runTime } from '../hook'
import { isFalse, isSpecifyValue, isTruthy } from "../check"

export async function handleRun(item: TestResult): Promise<void> {
	const {
		params = [],
		expect,
		prototype = undefined,
		expectType
	}: TestResult = item || {}

	// 计算实际结果
	if (isFunction(prototype) && prototype) {
		try {
			if (expectType === 'Mock') {
				const mockParams = params.map(item => Mock(item))
				const runTimeRes = await runTime(prototype, ...mockParams)
				item.actual = runTimeRes.result
				item.runTime = runTimeRes.runTime
			} else {
				const runTimeRes = await runTime(prototype, ...params)
				item.actual = runTimeRes.result
				item.runTime = runTimeRes.runTime
			}
		} catch (error) {
			item.setType.bind(item)('RunningError', error)
		}
	}

	// 下面开始比较各种处理方式

	if (expect === item.actual) {
		item.setType.bind(item)('Success')
	}

	try {

		if (expectType === 'False') {
			if (
				expect?.length > 0 && isSpecifyValue.bind(this)(item.actual, expect)
			) {
				item.setType.bind(item)('Success')
			} else {
				if (isFalse(item.actual)) {
					item.setType.bind(item)('Success')
				} else {
					item.setType.bind(item)('error')
				}
			}

		}


		if (expectType === 'Truthy') {
			if (
				expect?.length > 0 && isSpecifyValue.bind(this)(item.actual, expect)
			) {
				item.setType.bind(item)('Success')
			}


			if (isTruthy(item.actual)) {
				item.setType.bind(item)('Success')
			}

		}

		if (expectType === 'RegExp') {
			if ((expect as unknown as RegExp).test(item.actual)) {
				item.setType.bind(item)('Success')
			} else {
				item.setType.bind(item)('NoConformSpecRegExp')
			}

		}

		if (expectType === 'RegExps') {
			if ((expect as unknown[] as RegExp[]).filter(i => i.test(item.actual)).length) {
				item.setType.bind(item)('Success')
			} else {
				item.setType.bind(item)('NoConformSpecRegExp')
			}

		}

		if (expectType === 'Multivalued') {
			if ((expect as unknown[] as any[]).filter(i =>
				i === item.actual
				|| (type(i) === 'RegExp' && i.test(String(item.actual)))).length
			) {
				item.setType.bind(item)('Success')
			} else {
				item.setType.bind(item)('NoConformSpecRegExp')
			}

		}

	} catch (error) {
		item.setType.bind(item)('NoConformSpecRegExp', error)
	}
}