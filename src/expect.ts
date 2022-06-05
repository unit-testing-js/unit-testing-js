import { TestResult, TestTypeMap } from './assets/type'
import { mockFormat, tobe, tobeTruthy, tobeFalse, mock, tobeRegExp, tobeRegExps, tobes } from './util'

export const ResultCodeSuccess = 0
export const ResultCodeError = 1
export const ResultCodeWarning = 2

const cmmConfig = {
	configurable: true,
	writable: true,
	enumerable: false
}


export interface Expect extends TestResult {
	tobe?: (...args: any[]) => Expect;
	tobes?: (args: any[]) => Expect;
	tobeFalse?: (...args: any[]) => Expect;
	tobeTruthy?: (...args: any[]) => Expect;
	tobeRegExp?: (reg:RegExp) => Expect;
	tobeRegExps?: (regs: RegExp[]) => Expect;
	setParams?: (...args: any[]) => Expect;
	mock?: (...args: any[]) => Expect;
	mockFormat?: (...args: any[]) => Expect;
	setType?: (testTypeKey: TestTypeMap[string], message?: string ) => void;
}

export function expect(value?: any): Expect {

	const tmp: TestResult = {
		type: '21',
		message: '',
		prototype: undefined,
		origin: value,
		expect: undefined,
		actual: value
	}

	switch (typeof value) {
		case 'function':
			tmp.prototype = value
			tmp.origin = undefined
			tmp.actual = undefined
			break;
		default:
			break;
	}

	Object.defineProperties(tmp, {
		// tobe : 期望值
		tobe: {
			...cmmConfig,
			value: tobe
		},
		// tobe : 期望值
		tobes: {
			...cmmConfig,
			value: tobes
		},
		// 匹配假值
		tobeFalse: {
			...cmmConfig,
			value: tobeFalse
		},
		// 匹配真值
		tobeTruthy: {
			...cmmConfig,
			value: tobeTruthy
		},

		// 匹配正则
		tobeRegExp: {
			...cmmConfig,
			value: tobeRegExp
		},

		// 匹配正则数组(满足一个就为真)
		tobeRegExps: {
			...cmmConfig,
			value: tobeRegExps
		},
		/** 运行函数 */

		mock: {
			...cmmConfig,
			value: mock
		},

		mockFormat: {
			...cmmConfig,
			value: mockFormat
		},

		// 设置状态
		setType: {
			...cmmConfig,
			value: function (testTypeKey: TestTypeMap[string], message?: string) {
				this.type = testTypeKey.type
				this.message = message || testTypeKey.message
			}
		},

		// 设置状态
		setParams: {
			...cmmConfig,
			value: function (...args: any[]): Expect {
				this.params = args
				return this
			}
		}

	})


	return tmp
}