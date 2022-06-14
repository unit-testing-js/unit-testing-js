import { isFunction, type } from 'rh-js-methods'
import { TestResult, TestTotal, TestTypeMap } from './assets/type'
import { handlelog, handleRun } from './utils'
import { Mock } from 'rh-mock'

export async function logResult(testTotal: TestTotal) {

	const { name, lang = 'zh_CN', resultlist = [] } = testTotal

	const resultSuccess: TestResult[] = []
	const resultError: TestResult[] = []
	const resultWarning: TestResult[] = []

	for (let i = 0; i < resultlist.length; i++) {

		const item: TestResult = resultlist[i] || {}

		await handleRun.bind(item)(item)

		if (item && !item.name) {
			item.name = name + ' : ' + i
		}

		if (isNaN(Number(item.type))) {
			resultError.push(item)
			continue;
		}

		if (/^0[0-9]{0,}$/.test(String(item.type))) {
			resultSuccess.push(item)
			continue
		}

		if (/^1[0-9]{0,}$/.test(String(item.type))) {
			resultError.push(item)
			continue
		}

		if (/^2[0-9]{0,}$/.test(String(item.type))) {
			resultWarning.push(item)
			continue
		}

	}

	handlelog({
		name,
		lang,
		resultlist,
		resultError,
		resultSuccess,
		resultWarning,
	})
}


export async function logResultByConfig(testTotal: TestTotal) {

	const { name, lang = 'zh_CN', resultlist = [] } = testTotal

	const resultSuccess: TestResult[] = []
	const resultError: TestResult[] = []
	const resultWarning: TestResult[] = []

	for (let i = 0; i < resultlist.length; i++) {

		const item: TestResult = resultlist[i] || {}

		const { params = [], expect, prototype = undefined }: TestResult = item || {}

		if (isFunction(prototype) && prototype) {
			try {
				if (item.expectType === 'Mock') {
					const mockParams = params.map(item => Mock(item))
					item.actual = await prototype(...mockParams)
				} else {
					item.actual = await prototype(...params)
				}
				if (expect === item.actual) {
					item.setType.bind(item)(TestTypeMap.Success)
				}
			} catch (error) {
				item.setType.bind(item)(TestTypeMap.RunningError, error)
			}
		}

		if (item.expectType === 'RegExp') {
			try {
				if ((expect as unknown as RegExp).test(item.actual)) {
					item.setType.bind(item)(TestTypeMap.Success)
				} else {
					item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
				}
			} catch (error) {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp, error)
			}
		}

		if (item.expectType === 'RegExps') {
			try {
				if ((expect as unknown[] as RegExp[]).filter(i => i.test(item.actual)).length) {
					item.setType.bind(item)(TestTypeMap.Success)
				} else {
					item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
				}
			} catch (error) {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp, error)
			}
		}

		if (item.expectType === 'Multivalued') {
			try {
				if ((expect as unknown[] as any[]).filter(i =>
					i === item.actual
					|| (type(i) === 'RegExp' && i.test(String(item.actual)))).length
				) {
					item.setType.bind(item)(TestTypeMap.Success)
				} else {
					item.setType.bind(item)(TestTypeMap.noConformSpecRegExp)
				}
			} catch (error) {
				item.setType.bind(item)(TestTypeMap.noConformSpecRegExp, error)
			}
		}

		if (item && !item.name) {
			item.name = name + ':' + i
		}

		if (isNaN(Number(item.type))) {
			resultError.push(item)
			continue;
		}

		if (/^0[0-9]{0,}$/.test(String(item.type))) {
			resultSuccess.push(item)
			continue
		}

		if (/^1[0-9]{0,}$/.test(String(item.type))) {
			resultError.push(item)
			continue
		}

		if (/^2[0-9]{0,}$/.test(String(item.type))) {
			resultWarning.push(item)
			continue
		}

	}

	handlelog({
		name,
		lang,
		resultlist,
		resultError,
		resultSuccess,
		resultWarning,
	})
}