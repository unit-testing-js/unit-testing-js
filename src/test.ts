import { isObject, isString } from 'rh-js-methods';
import { logResult } from './result';
import { TestResult, TestTotal } from './assets/type'
import { toLang, Lang } from './assets/locales'

type testConfig = string | {
	name: string
	lang?: Lang
}

export async function test(config: testConfig, ...results: TestResult[]): Promise<TestTotal> {

	const res = {
		name: '',
		lang: 'zh_CN',
		results
	} as TestTotal

	if (isString(config)) {
		res.name = config.toString()
	}

	if (isObject(config) && typeof config === 'object') {
		res.name = config.name || ''
		res.lang = toLang(config.lang || 'zh_CN')
	}

	logResult.bind(this)(res)

	return res
}


// export function testArgs(
// 	func: (...args: any[]) => TestResult,
// 	argArr: { [key: string]: any }[] = []
// ) {
// 	return argArr.map((item = {}) => {
// 		console.log(item)
// 		// return func(...item)
// 	})
// }