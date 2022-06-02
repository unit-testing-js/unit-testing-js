
/**
 * 0: 成功
 * 02: 成功: 符合指定值
 * 1*: 错误
 * 12: 错误: 不符合指定值
 * 2*: 警告
 * 21: 警告: 没有校验
 */
export type TestResultType = '0' | '1' | '2' | string

export const TestTypeMap = {

	/** '0': 成功*/
	Success: ['0', { zh_CN: '成功', en_US: 'Success' }],
	/** '02': 符合指定值*/
	ConformSpecValue: ['02', { zh_CN: '符合指定值', en_US: 'Conform to specified value' }],

	/** '1': 错误*/
	error: ['1', { zh_CN: '错误', en_US: 'Error' }],
	/** '12': 不符合指定值*/
	noConformSpecValue: ['12', { zh_CN: '不符合指定值', en_US: 'Does not Conform to specified value' }],
	/** '12': 不符合默认值*/
	noConformDefaultValue: ['13', { zh_CN: '不符合默认值', en_US: 'Does not Conform to default value' }],

	/** '2': 警告*/
	warning: ['2', { zh_CN: '警告', en_US: 'Warning' }],
	/** '21': 无效校验*/
	InvalidVerification: ['21', { zh_CN: '无效校验', en_US: 'Invalid verification' }],
	/** '22': 没有校验*/
	noVerification: ['22', { zh_CN: '没有校验', en_US: 'No verification' }],

}


export interface TestResult {
	type: TestResultType
	name?: string
	message: string
	prototype?: any
	parameter?: any[]
	originResults: any
	expectedResults: any
	actualResults: any
	[key: string]: any
}

export interface TestTotal {
	name: string
	total: number
	resultSuccess: TestResult[]
	resultError: TestResult[]
	resultWarning: TestResult[]
}