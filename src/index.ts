
import { Func, useRun, CaseUnit, add, asyncAdd } from './assets'
export {  CaseUnit, add, asyncAdd }

export async function test<Param,Tobe>(name: string, func: Func, ...cases: CaseUnit<Param, Tobe>[]) {

	await useRun<Param,Tobe>(name, func, ...cases)

}
