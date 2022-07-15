export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Matcher' | 'Type'
export type CaseUnitParamType = 'Normal'

export type _Tobe<T> = string | RegExp | T

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