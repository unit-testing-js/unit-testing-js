
import type { CaseUnit, Func } from './type'
import { Testlogger } from './utils/Testlogger'
import { useRun } from './hook'

export * from './constants'
export * from './utils'
export * from './eg'
export * from './unitTest'

export { CaseUnit }

export const TestResultMap = new Map<string, any>()

export const TestSetting = new Map<string, number | string | boolean>([
	// 汇总结果集
	['isSummary', false]
])

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
export async function test(
	name: string,
	func: Func,
	...cases: CaseUnit[]
) {

	const result = await useRun(name, func, ...cases)

	TestResultMap.set(name, result)

	TestSetting.get('isSummary') && Testlogger(result)

	return result
}
