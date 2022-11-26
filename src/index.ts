
import type { CaseUnit, Func } from './assets'
import { add, asyncAdd, Testlogger, toBe, useRun } from './assets'

export * from './assets'
export { CaseUnit, add, asyncAdd, toBe }


type __TobeBase = boolean | string | number
type _TobeBase = boolean | string | number | Record<string, __TobeBase>
type TobeBase = _TobeBase | _TobeBase[]


export const TestResultMap = new Map<string, any>()
export const CaseParamsMap = new Map<string, any>()

export const TestSetting = new Map<string, number | string | boolean>()

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
export async function test<Param = any, Tobe = TobeBase>(
	name: string,
	func: Func,
	...cases: CaseUnit<Param, Tobe>[]
) {

	CaseParamsMap.set(name, { name, func, cases })

	const result = await useRun<Param, Tobe>(name, func, ...cases)

	Testlogger(result)

	return result
}