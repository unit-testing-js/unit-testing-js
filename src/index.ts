
import { Func, useRun, CaseUnit, add, asyncAdd, toBe } from './assets'
export { CaseUnit, add, asyncAdd, toBe }

type _TobeBase = boolean | string | number
type TobeBase = _TobeBase | _TobeBase[]

export async function test<Param = any, Tobe = TobeBase>(name: string, func: Func, ...cases: CaseUnit<Param, Tobe>[]) {
	await useRun<Param, Tobe>(name, func, ...cases)
}

export async function equal<Param = any, Tobe = TobeBase>(name: string, ...cases: CaseUnit<Param, Tobe>[]) {
	await useRun<Param, Tobe>(name, toBe, ...cases)
}