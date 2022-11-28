import { useRun } from '../../hook'
import { Testlogger } from '../Testlogger'
import type { IUnitTest, ParamMap } from './type'

class _UnitTest<Param, Result> implements IUnitTest<Param, Result> {

	name: string
	func: any
	defaultValue: Result
	params: Param[] = []
	valueCur = 0
	values: Map<string, Result> = new Map<string, Result>()
	paramCur = 0
	paramMaps: Map<string, ParamMap> = new Map<string, ParamMap>()

	constructor(func: any, name: string) {
		this.func = func
		this.name = name
	}

	addParam(...params: Param[]) {
		this.params = this.params.concat(params)
		this.paramCur += params.length
		return this
	}
	addParamMap(...params: ParamMap[]) {
		params.forEach((value: ParamMap, index: number) => {
			this.paramMaps.set(String(this.paramCur + index + 1), value)
		})
		this.paramCur += params.length
		return this
	}
	defaultTobe(value: Result) {
		this.defaultValue = value
		return this
	}
	tobe(...values: Result[]) {
		values.forEach((value: Result, index: number) => {
			this.values.set(String(index), value)
		})
		this.valueCur += values.length
		return this
	}
	setValues(record: Record<string, Result>) {
		for (const key in record)
			this.values.set(key, record[key])
		this.valueCur += Object.keys(record).length
		return this
	}
	async run() {
		const {
			name, func,
			params = [], paramMaps, paramCur,
			defaultValue, values
		} = this

		// console.log(func(...params) === defaultValue)
		// console.log(func(...params) === defaultValue)
		// console.log(params, paramMaps)
		// console.log(defaultValue, values)
		let total = 1
		const caseMapList: any[][] = []
		paramMaps.forEach((item: ParamMap) => {
			const { list = [] } = item
			if (list.length > 0) {
				caseMapList.push(list)
				total = total * list.length
			}
		})

		function getRestLen(index: number): number {
			let result = 1
			caseMapList.forEach((item, i) => {
				if (i > index) result = result * item.length || 1
			})
			return result
		}
		function getIndexValue(index: number): any[] {
			const result: unknown[] = []
			caseMapList.forEach((item, i) => {
				const len = item.length
				const restLen = getRestLen(i)
				result.push(item[Math.floor(index / restLen) % len])
			})
			return result
		}

		const cases: { params: any[], tobe: unknown }[] = []

		function getTobe(index: number) {
			if (values.has(String(index))) {
				return values.get(String(index))
			}
			return defaultValue
		}
		for (let i = 0; i < total; i++) {
			const unitValues = getIndexValue(i)
			cases.push({
				params: params.concat(unitValues),
				tobe: getTobe(i)
			})
		}
		const result = await useRun(name, func, ...cases)
		Testlogger(result)
	}
	async debug() {
		return
	}
}

export function UnitTest(func: any, name: string) {
	return new _UnitTest(func, name)
}