import { isObject, isString } from 'rh-js-methods';
import { logResult } from './result';
import { Control, TestResult, TestTotal } from './assets/type'
import { toLang, Lang } from './assets/locales'

type testConfig = string | {
	name: string
	lang?: Lang
	control?: string[]
}

export function test(config: testConfig, ...resultlist: TestResult[]): TestTotal {

	const res = {
		name: '',
		lang: 'zh_CN',
		resultlist
	} as TestTotal

	if (isString(config)) {
		res.name = config.toString()
	}

	if (isObject(config) && typeof config === 'object') {
		res.name = config?.name || ''
		res.lang = toLang(config?.lang)
	}

	logResult.bind(this)(res)

	return res
}


export function testFunc(
	config: testConfig,
	control: Control[],
	...resultlist: any[]
): TestTotal {

	// console.log(control)

	const res = {
		name: '',
		lang: 'zh_CN',
		resultlist
	} as TestTotal

	if (isString(config)) {
		res.name = config.toString()
	}

	if (isObject(config) && typeof config === 'object') {
		res.name = config?.name || ''
		res.lang = toLang(config?.lang)
	}

	logResult.bind(this)(res)

	return res
}