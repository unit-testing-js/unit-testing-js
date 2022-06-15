import { AnyFunction } from 'rh-js-methods'
import { Lang, MessageKey } from './locales'

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

export interface Expect extends TestResult {
	tobe?: (...args: any[]) => Expect;
	tobes?: (args: any[]) => Expect;
	tobeFalse?: (...args: any[]) => Expect;
	tobeTruthy?: (...args: any[]) => Expect;
	tobeRegExp?: (reg: RegExp) => Expect;
	tobeRegExps?: (regs: RegExp[]) => Expect;
	setParams?: (...args: any[]) => Expect;
	mock?: (...args: any[]) => Expect;
	mockFormat?: (...args: any[]) => Expect;
	setType?: (key: MessageKey, message?: string) => void;
}