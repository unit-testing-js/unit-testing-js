import { AnyFunction } from 'rh-js-methods'
import { Lang } from './locales'

export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'RegExps'
export type CaseUnitParamType = 'Normal'

export type CaseUnit = {
	name?: string
	params: any
	tobe: any
	type?: CaseUnitType
	paramType?: CaseUnitParamType
	/**
	 * @title 超时时间
	 * @default 2000
	 */
	timeout?: number | 'Infinite'
	run?: {
		actual: any,
		runTime: number,
		error?: string
	}
	[key: string]: any
}


export type TestResultType = '0' | '1' | '2' | string


export interface TestResult {
	type: TestResultType
	name?: string
	message: string
	params?: any[]
	origin: any
	expect: any
	expectType?: string
	actual: any
	prototype?: AnyFunction | ((...args: any[]) => Promise<any>)
	mockReg?: string | string[]
	mockPath?: string | string[],
	/**
	 * @title 超时时间
	 * @default 2000
	 */
	timeOut?: number
	/**
	 * @title 运行时间
	 * @default 0 
	 * 
	 */
	runTime?: number
	[key: string]: any
}

export interface TestTotal {
	name: string
	lang?: Lang
	results: TestResult[]
}