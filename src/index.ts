
import { Func, useRun, CaseUnit, add, asyncAdd } from './assets'
export { CaseUnit, add, asyncAdd }

type _TobeBase = boolean | string | number
type TobeBase = _TobeBase | _TobeBase[]

export async function test<Param = any, Tobe = TobeBase>(name: string, func: Func, ...cases: CaseUnit<Param, Tobe>[]) {
	await useRun<Param, Tobe>(name, func, ...cases)
}