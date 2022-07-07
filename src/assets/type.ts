export type Func = (...args: any[]) => (Promise<any> | any)

export type CaseUnitType = 'Normal' | 'RegExp' | 'Match' | 'Type'
export type CaseUnitParamType = 'Normal'

export type CaseUnit = {
	name?: string
	params: any
	tobe?: any
	tobes?: any[]
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