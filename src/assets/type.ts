export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Matcher' | 'Type'
export type CaseUnitParamType = 'Normal'

export type _Tobe<T> = number | string | RegExp | T

type _callback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => CaseUnit<Param, Tobe>

type _asyncCallback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => Promise<CaseUnit<Param, Tobe>>

type callback<Param, Tobe> = _callback<Param, Tobe> | _asyncCallback<Param, Tobe>

export type CaseUnit<Param, Tobe> = {
	func?: any
	name?: string
	param?: Param
	params?: Param | Param[]
	tobe?: _Tobe<Tobe>
	tobes?: _Tobe<Tobe>[]
	type?: CaseUnitType
	paramType?: CaseUnitParamType
	/**
	 * 测试执行前
	 */
	before?: callback<Param, Tobe>
	/**
	 * 判断结果是否正确前
	 */
	beforeEqual: callback<Param, Tobe>
	/**
	 * 打印结果前
	 */
	after?: callback<Param, Tobe>
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