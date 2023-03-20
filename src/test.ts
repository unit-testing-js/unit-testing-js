
import type { CaseUnit, Func, TestRunResult } from './type'
import { Testlogger } from './utils/Testlogger'
import { useRun } from './hook/useRun'
import { isFunction, isString, isObject } from 'check-it-type'
import { toBe } from './eg'

export const TestSetting = new Map<string, number | string | boolean>([
	// 汇总结果集
	['isSummary', false]
])

export const _TestResultMap = new Map<string, any>()

export const TestResultMap = {
	get: function (name: string) {
		return _TestResultMap.get(name)
	},
	set: function (name: string, result: any) {
		if (_TestResultMap.has(name)) {
			_TestResultMap.set(`${name}+`, result)
			return
		}
		_TestResultMap.set(name, result)
	}
}

/**
 * @title test<Param,Tobe>
 * 
 * @paradigm Param 用例参数
 * @paradigm Tobe 用例结果
 * 
 * @param name string 用例名
 * @param func Function 待测试的方法
 * @param ...cases:CaseUnit<Param,Tobe> 测试用用例
 */
export async function test(nameOrFunc: string | Func, funcOrCase?: CaseUnit | Func, ...cases: CaseUnit[]): Promise<TestRunResult> {

	let name = ''
	let func: Func = toBe

	if (isString(nameOrFunc)) name = nameOrFunc

	if (isFunction(funcOrCase)) func = funcOrCase
	if (isObject(funcOrCase)) cases.unshift(funcOrCase as CaseUnit)

	const result = await useRun(name, func, ...cases)

	TestResultMap.set(name, result)

	if (TestSetting.get('isSummary') === false) {
		Testlogger(result)
	}

	return result
}