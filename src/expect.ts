import { TestResult, TestResultType, TestTypeMap } from './type'
import { tobe, tobeTruthy, tobeFalse } from './util'

export const ResultCodeSuccess = 0
export const ResultCodeError = 1
export const ResultCodeWarning = 2

const cmmConfig = {
	configurable: true,
	writable: true,
	enumerable: false,
}


export interface Expect extends TestResult {
	tobe?: (...args: any[]) => Expect;
	tobeFalse?: (...args: any[]) => Expect;
	tobeTruthy?: (...args: any[]) => Expect;
	setType?: (testTypeKey?: [string, {
		zh_CN: string,
		en_US: string,
		[key: string]: string
	}]) => void;
}

export function expect(value: any): Expect {

	const tmp: TestResult = {
		type: '21',
		message: '',
		prototype: undefined,
		originResults: value,
		expectedResults: undefined,
		actualResults: value
	}

	switch (typeof value) {
		case 'function':
			tmp.prototype = value
			tmp.originResults = undefined
			tmp.actualResults = undefined
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

		// 设置状态
		setType: {
			...cmmConfig,
			value: function (testTypeKey) {
				this.type = testTypeKey[0]
				this.message = testTypeKey[1].zh_CN
			}
		}

	})
	return tmp
}