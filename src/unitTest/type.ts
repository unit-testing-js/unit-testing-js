export interface IUnitTest {
	name: string
	defaultValue: any
	params: any[]
	values: Map<string, any>
	paramMaps: Map<string, any[] | any>


	addParam: (...params: any[]) => this
	addParamMap: (...params: any[][]) => this

	setDefaultValue: (value: any) => this
	tobe: (...values: any[]) => this
	setIndexValues: (record: Record<string, any>) => this

	run: () => Promise<void>
	debug: () => Promise<void>
}