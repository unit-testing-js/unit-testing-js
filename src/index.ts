
import type { CaseUnit, Func } from './assets'
import { add, asyncAdd, Testlogger, toBe, useRun } from './assets'

export * from './constants'
export * from './assets'
export { CaseUnit, add, asyncAdd, toBe }

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
export async function test(
	name: string,
	func: Func,
	...cases: CaseUnit[]
) {

	CaseParamsMap.set(name, { name, func, cases })

	const result = await useRun(name, func, ...cases)

	Testlogger(result)

	return result
}

import { toArray } from 'abandonjs'

test('123', toArray,
	{ params: [null], tobe: [-Infinity] },
	{ params: [NaN], tobe: [-Infinity] },
	{ params: [undefined], tobe: [-Infinity] },
	{ params: [true], tobe: [true] },
	{ params: [1], tobe: [1] },
	{ params: [10], tobe: [10] },
	{ params: ['template'], tobe: ['template'] },
	{ params: [[]], tobe: [[]] },
	{ params: [{}], tobe: [{}] },
	{ params: [false], tobe: [false] },
	{ params: [0], tobe: [0] },
	{ params: [-1], tobe: [-1] },
	{ params: [null], tobe: [-Infinity] },
	{ params: [NaN], tobe: [-Infinity] },
	{ params: [undefined], tobe: [-Infinity] },
	{ params: [''], tobe: [''] },
	{ params: [0], tobe: [0] },
	{ params: [0.00001], tobe: [0.00001] },
	{ params: [-0.00001], tobe: [-0.00001] },
	{ params: [1], tobe: [1] },
	{ params: [-1], tobe: [-1] },
	{ params: [99999], tobe: [99999] },
	{ params: [-99999], tobe: [-99999] },
	{ params: [Infinity], tobe: [-Infinity] },
	{ params: [-Infinity], tobe: [-Infinity] },
	{
		params: [1.7976931348623157e+308],
		tobe: [1.7976931348623157e+308]
	},
	{
		params: [-1.7976931348623157e+308],
		tobe: [-1.7976931348623157e+308]
	}
)
