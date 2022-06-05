import { isObject, isString } from 'rh-js-methods';
import { logResult } from './result';
import { TestResult, TestTotal } from './assets/type'
import { toLang, Lang } from './assets/locales'

type testConfig = string | {
	name: string
	lang?: Lang
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