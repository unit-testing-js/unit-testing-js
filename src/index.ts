
import { Func, useRun, CaseUnit, add, asyncAdd, toBe } from './assets'
export { CaseUnit, add, asyncAdd, toBe }

type _TobeBase = boolean | string | number
type TobeBase = _TobeBase | _TobeBase[]
/**
 * @title test<Param,Tobe>
 * 
 * @paradigm Param 用例参数
 * @paradigm Tobe 用例结果
 * 
 * @param name string 用例名
 * @param func Func 待测试的方法
 * @param ...cases:CaseUnit<Param,Tobe> 测试用用例
 */
export async function test<Param = any, Tobe = TobeBase>(name: string, func: Func, ...cases: CaseUnit<Param, Tobe>[]) {
	await useRun<Param, Tobe>(name, func, ...cases)
}

/**
 * @title test<Param,Tobe>
 * @param name string 用例名
 * @param ...cases:CaseUnit<Param,Tobe> 测试用用例
 */
export async function equal<Param = any, Tobe = TobeBase>(name: string, ...cases: CaseUnit<Param, Tobe>[]) {
	await useRun<Param, Tobe>(name, toBe, ...cases)
}