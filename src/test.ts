
import type { CaseUnit, Func, TestRunResult } from './type'
import { useRun } from './hook/useRun'
import { isFunction, isString, isObject } from 'asura-eye'
import { toBe } from './eg'
import { getFunctionName, Testlogger } from './utils'

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

	const name = isString(nameOrFunc) ? nameOrFunc : getFunctionName(nameOrFunc)
	let func: Func = toBe
	if (isFunction(nameOrFunc)) {
		func = nameOrFunc
		cases.unshift(funcOrCase as CaseUnit)
	} else if (isFunction(funcOrCase)) {
		func = funcOrCase
	} else if (isObject(funcOrCase))
		cases.unshift(funcOrCase as CaseUnit)

	const result = await useRun(name, func, ...cases)

	TestResultMap.set(name, result)

	if (TestSetting.get('isSummary') === false) {
		Testlogger(result)
	}

	return result
}