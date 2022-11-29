export interface IUnitTest<Param, Result> {
	name: string
	defaultValue: Result
	params: Param[]
	values: Map<string, Result>
	weakValues?: WeakMap<any, any>
	paramMaps: Map<string, Param[] | Result>


	addParam: (...params: Param[]) => IUnitTest<Param, Result>
	addParamMap: (...params: Param[][]) => IUnitTest<Param, Result>

	setDefaultValue: (value: Result) => IUnitTest<Param, Result>
	tobe: (...values: Result[]) => IUnitTest<Param, Result>
	setIndexValues: (record: Record<string, Result>) => IUnitTest<Param, Result>

	run: () => Promise<void>
	debug: () => Promise<void>
}