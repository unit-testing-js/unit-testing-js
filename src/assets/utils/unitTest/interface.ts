import type { IUnitTest } from './type'

export class UnitTestInterface<Param, Result> implements IUnitTest<Param, Result> {

	name: string
	func: any

	cases: { params: any[], tobe: any }[] = []

	defaultValue: Result
	params: Param[] = []
	valueCur = 0
	indexValues: Map<string, Result> = new Map<string, Result>()
	values: Map<string, Result> = new Map<string, Result>()

	paramCur = 0
	paramMaps: Map<string, Param[]> = new Map<string, Param[]>()

	paramSection: number[] = []

	addParam(...params: Param[]) {
		this.params = this.params.concat(params)
		this.paramCur += params.length
		this.paramSection.push(params.length)
		return this
	}
	addParamMap(...params: Param[][]) {
		params.forEach((value: Param[], index: number) => {
			this.paramMaps.set(String(this.paramCur + index + 1), value)
		})
		this.paramCur += params.length
		this.paramSection.push(-params.length)

		return this
	}

	setDefaultValue(value: Result) {
		this.defaultValue = value
		return this
	}
	setIndexValues(record: Record<string, Result>) {
		for (const key in record)
			this.indexValues.set(key, record[key])
		this.valueCur += Object.keys(record).length
		return this
	}
	setMapValues(...records: (Param | Result)[]) {
		for (let i = 0; i < records.length; i += 2) {
			const key = records[i] as Param
			const value = records[i + 1] as Result
			this.values.set(JSON.stringify(key), value)
		}
		return this
	}
	tobe(...values: Result[]) {
		values.forEach((value: Result, index: number) => {
			this.indexValues.set(String(index), value)
		})
		this.valueCur += values.length
		return this
	}
	getTobe(index: number, params: any) {
		const { defaultValue, values, indexValues } = this

		if (values.has(JSON.stringify(params)))
			return values.get(JSON.stringify(params))

		if (indexValues.has(String(index)))
			return indexValues.get(String(index))

		return defaultValue
	}
	addCases(...cases: { params: any[], tobe: any }[]) {
		this.cases = this.cases.concat(cases)
	}
	buildCases() {
		console.warn('buildCases Method not implemented');
		return this
	}
	async run() {
		console.warn('run Method not implemented');
		return
	}
	async debug() {
		console.warn('debug Method not implemented');
		return
	}
}