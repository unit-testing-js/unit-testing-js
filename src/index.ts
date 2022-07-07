
import { Func, useRun, CaseUnit } from './assets'
export {  CaseUnit }

export async function test(name: string, func: Func, ...cases: CaseUnit[]) {

	await useRun(name, func, ...cases)

}
