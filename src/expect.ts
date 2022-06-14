import { TestResult, Expect } from './assets/type'
import { mockFormat, tobe, tobeTruthy, tobeFalse, mock, tobeRegExp, tobeRegExps, tobes, setType, setParams } from './library'

export const ResultCodeSuccess = 0
export const ResultCodeError = 1
export const ResultCodeWarning = 2

const cmmConfig = (fn: any) => {
	return {
		configurable: true,
		writable: true,
		enumerable: false,
		value: fn
	}
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
		tobe: cmmConfig(tobe),
		// tobe : 期望值
		tobes: cmmConfig(tobes),
		// 匹配假值
		tobeFalse: cmmConfig(tobeFalse),
		// 匹配真值
		tobeTruthy: cmmConfig(tobeTruthy),
		// 匹配正则
		tobeRegExp: cmmConfig(tobeRegExp),
		// 匹配正则数组(满足一个就为真)
		tobeRegExps: cmmConfig(tobeRegExps),
		mock: cmmConfig(mock),
		mockFormat: cmmConfig(mockFormat),

		// 设置状态
		setType: cmmConfig(setType) ,
		// 设置状态
		setParams: cmmConfig(setParams)

	})


	return tmp
}