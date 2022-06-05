import { AnyFunction } from 'rh-js-methods'
import { messageMap, Lang, MessageMap } from './locales'

export type TestResultType = '0' | '1' | '2' | string

export interface TestTypeMap {
	[key: string]: {
		type: string,
		message: MessageMap[string]
	}
}

export const TestTypeMap = {
	/** '0': 成功*/
	Success: { type: '0', message: messageMap.Success },
	/** '02': 符合指定值*/
	ConformSpecValue: { type: '02', message: messageMap.ConformSpecValue },

	/** '1': 错误*/
	error: { type: '1', message: messageMap.error },
	/** '12': 不符合指定值*/
	noConformSpecValue: { type: '12', message: messageMap.noConformSpecValue },
	/** '121': 不符合指定正则规则 */
	noConformSpecRegExp: { type: '121', message: messageMap.noConformSpecRegExp },
	/** '13': 不符合默认值*/
	noConformDefaultValue: { type: '13', message: messageMap.noConformDefaultValue },
	/** '14': 运行错误 */
	RunningError: { type: '14', message: messageMap.RunningError },

	/** '2': 警告*/
	warning: { type: '2', message: messageMap.warning },
	/** '21': 无效校验*/
	InvalidVerification: { type: '21', message: messageMap.InvalidVerification },
	/** '22': 没有校验*/
	noVerification: { type: '22', message: messageMap.noVerification },
}


export interface TestResult {
	type: TestResultType
	name?: string
	message: string | MessageMap[string]
	params?: any[]
	origin: any
	expect: any
	expectType?: string
	actual: any
	prototype?: AnyFunction | ((...args: any[]) => Promise<any>)
	mockReg?: string | string[]
	mockPath?: string | string[]
	[key: string]: any
}

export interface TestTotal {
	name: string
	lang?: Lang
	resultlist: TestResult[]
}