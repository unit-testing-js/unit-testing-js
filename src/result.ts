import { isFunction, type } from 'rh-js-methods'
import { log, Color } from 'rh-color'
import { TestResult, TestTotal, TestTypeMap } from './assets/type'
import { messageMap } from './assets/locales'

export async function logResult(testTotal: TestTotal) {


	const {
		name,
		lang = 'zh_CN',
		resultlist = []
	} = testTotal

	const resultSuccess: TestResult[] = []
	const resultError: TestResult[] = []
	const resultWarning: TestResult[] = []

	for (let i = 0; i < resultlist.length; i++) {

		const item: TestResult = resultlist[i] || {}

		const { params = [], expect, prototype = undefined }: TestResult = item || {}

		if (isFunction(prototype) && prototype) {
			try {
				item.actual = await prototype(...params)
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

	console.log(`name: ${name}`)
	log(Color.Blue)('Total Count: ' + resultlist.length || 0)
	log(Color.Green)('Success Count: ' + resultSuccess.length)

	if (resultWarning.length) {
		log(Color.Yellow)('Warning Count: ' + resultWarning.length)
		console.log()
		log(Color.Red)(messageMap.msgWarning[lang])

		for (let i = 0; i < resultWarning.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = resultWarning[i] || []

			console.log(rest);
			log(Color.Red)(`${name}  ${message[lang] || message}`)
		}
	}

	if (resultError.length > 0) {

		log(Color.Red)('Error Count: ' + resultError.length)
		console.log()
		log(Color.Red)(messageMap.msgError[lang])

		for (let i = 0; i < resultError.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = resultError[i] || []

			console.log(rest);

			log(Color.Red)(`${name}  ${message[lang] || message}`)
		}

	}

}
