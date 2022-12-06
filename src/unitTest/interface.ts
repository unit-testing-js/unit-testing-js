import { stringify } from 'abandonjs'
import type { IUnitTest } from './type'

export class UnitTestInterface implements IUnitTest {

	name: string
	func: any

	cases: { params: any[], tobe: any }[] = []

	defaultValue: any
	params: any[] = []
	valueCur = 0
	indexValues: Map<string, any> = new Map<string, any>()
	values: Map<string, any> = new Map<string, any>()

	paramCur = 0
	paramMaps: Map<string, any[]> = new Map<string, any[]>()

	paramSection: number[] = []

	addParam(...params: any[]) {
		this.params = this.params.concat(params)
		this.paramCur += params.length
		this.paramSection.push(params.length)
		return this
	}
	addParamMap(...params: any[][]) {
		params.forEach((value: any[], index: number) => {
			this.paramMaps.set(String(this.paramCur + index + 1), value)
		})
		this.paramCur += params.length
		this.paramSection.push(-params.length)

		return this
	}

	setDefaultValue(value: any) {
		this.defaultValue = value
		return this
	}
	setIndexValues(record: Record<string, any>) {
		for (const key in record)
			this.indexValues.set(key, record[key])
		this.valueCur += Object.keys(record).length
		return this
	}
	setMapValues(...records: (any | any)[]) {
		for (let i = 0; i < records.length; i += 2) {
			const key = records[i] as any
			const value = records[i + 1] as any
			this.values.set(stringify(key), value)
		}
		return this
	}
	tobe(...values: any[]) {
		values.forEach((value: any, index: number) => {
			this.indexValues.set(String(index), value)
		})
		this.valueCur += values.length
		return this
	}
	getTobe(index: number, params: any) {
		const { defaultValue, values, indexValues } = this

		if (values.has(stringify(params)))
			return values.get(stringify(params))

		if (indexValues.has(String(index)))
			return indexValues.get(String(index))

		return defaultValue
	}
	addCases(...cases: { params: any[], tobe: any }[]) {
		this.cases = this.cases.concat(cases)
		return this
	}
	buildCases() {
		console.warn('buildCases Method not implemented');
		return this
	}
	async run() {
		console.warn('run Method not implemented');
		return {
			name: 'name',
			SuccessQue: [],
			WarnningQue: [],
			ErrorQue: [],
			totalRunTime: 0
		}
	}
	async debug() {
		console.warn('debug Method not implemented');
		return
	}
}