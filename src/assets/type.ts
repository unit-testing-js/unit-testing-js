export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Matcher' | 'Type'
export type CaseUnitParamType = 'Normal'

export type _Tobe<T> = string | RegExp | T

type _callback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => void
type _asyncCallback<Param, Tobe> = (caseUnit: CaseUnit<Param, Tobe>) => void

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
	before?: callback<Param, Tobe>
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