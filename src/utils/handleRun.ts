import { TestResult, TestTypeMap } from "../assets/type"
import { isFunction, type } from "rh-js-methods"
import { Mock } from "rh-mock"
import { isFalse, isSpecifyValue, isTruthy } from "../check"

export async function handleRun(item: TestResult): Promise<void> {
	const { params = [], expect, prototype = undefined, expectType }: TestResult = item || {}

	// 计算实际结果
	if (isFunction(prototype) && prototype) {
		try {
			if (expectType === 'Mock') {
				const mockParams = params.map(item => Mock(item))
				item.actual = await prototype(...mockParams)
			} else {
				item.actual = await prototype(...params)
			}
		} catch (error) {
			item.setType.bind(item)(TestTypeMap.RunningError, error)
		}
	}

	// 下面开始比较各种处理方式

	if (expect === item.actual) {
		item.setType.bind(item)(TestTypeMap.Success)
	}

	try {

		if (expectType === 'False') {
			if (
				expect?.length > 0 && isSpecifyValue.bind(this)(item.actual, expect)
			) {
				item.setType.bind(item)(TestTypeMap.Success)
			} else {
				if (isFalse(item.actual)) {
					item.setType.bind(item)(TestTypeMap.Success)
				} else {
					item.setType.bind(item)(TestTypeMap.error)
				}
			}

		}


		if (expectType === 'Truthy') {
			if (
				expect?.length > 0 && isSpecifyValue.bind(this)(item.actual, expect)
			) {
				item.setType.bind(item)(TestTypeMap.Success)
			}


			if (isTruthy(item.actual)) {
				item.setType.bind(item)(TestTypeMap.Success)
			}

		}

		if (expectType === 'RegExp') {
			if ((expect as unknown as RegExp).test(item.actual)) {
				item.setType.bind(item)(TestTypeMap.Success)
			} else {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
			}

		}

		if (expectType === 'RegExps') {
			if ((expect as unknown[] as RegExp[]).filter(i => i.test(item.actual)).length) {
				item.setType.bind(item)(TestTypeMap.Success)
			} else {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
			}

		}

		if (expectType === 'Multivalued') {
			if ((expect as unknown[] as any[]).filter(i =>
				i === item.actual
				|| (type(i) === 'RegExp' && i.test(String(item.actual)))).length
			) {
				item.setType.bind(item)(TestTypeMap.Success)
			} else {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
			}

		}

	} catch (error) {
		item.setType.bind(item)(TestTypeMap.noConformSpecRegExp, error)
	}
}