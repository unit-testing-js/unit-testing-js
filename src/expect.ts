export type ResultCode = number

export const ResultCodeSuccess = 0
export const ResultCodeError = 1
export const ResultCodeWarning = 2

// const matchers = {
// 	toBe: (value:any)=> 
// }	

// tobe : 期望值
// toBe用于Object.is测试完全相等。如果要检查对象的值
// toEqual递归检查对象或数组的每个字段。
/* toBeNull仅匹配null
toBeUndefined仅匹配undefined
toBeDefined是相反的toBeUndefined
toBeTruthy匹配if语句视为真实的任何内容
toBeFalsy匹配任何被if语句视为假的东西 */


export class expectClass {
	value = undefined
	originValue = undefined
	constructor(value: any) {
		this.value = value
		this.originValue = value
	}
	mockValue(reg?: any) {
		// console.log({ reg })
		return reg
	}
	is(value:any){
		return this.originValue  === value
	}
}


export function expect(value: any) {
	return new expectClass(value)
}