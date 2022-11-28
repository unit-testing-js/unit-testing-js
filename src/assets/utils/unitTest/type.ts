export interface ParamMap {
	// mult 
	type?: string
	num?: number
	list: unknown[]
}

export interface IUnitTest<Param, Result> {
	name: string
	defaultValue: Result
	params: Param[]
	values: Map<string, Result>
	paramMaps: Map<string, ParamMap>


	addParam: (...params: Param[]) => IUnitTest<Param, Result>
	addParamMap: (...params: ParamMap[]) => IUnitTest<Param, Result>

	defaultTobe: (value: Result) => IUnitTest<Param, Result>
	tobe: (...values: Result[]) => IUnitTest<Param, Result>
	setValues: (record: Record<string, Result>) => IUnitTest<Param, Result>

	run: () => Promise<void>
	debug: () => Promise<void>
}