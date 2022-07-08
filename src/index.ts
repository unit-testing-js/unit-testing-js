
import { Func, useRun, CaseUnit, add, asyncAdd } from './assets'
export {  CaseUnit, add, asyncAdd }

export async function test(name: string, func: Func, ...cases: CaseUnit[]) {

	await useRun(name, func, ...cases)

}
