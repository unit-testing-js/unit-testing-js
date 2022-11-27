import type { BaseValueMapKey } from '../../constants'
import { BaseValueMap } from '../../constants'
import { type, toArray } from 'abandonjs'

function buildCaseGen(list: unknown[] = [], args: unknown[] = [], dept = 0) {
	if (dept === args.length) return list

	const newList: unknown[] = []
	const key = args[dept]

	const argMapList = type(key) === 'String' ? toArray(BaseValueMap.get(key as string)) : []

	if (argMapList.length === 0) {
		return buildCaseGen(list, args, dept + 1)
	}

	if (dept === 0) {
		argMapList.forEach(unit => {
			const params = Array.from(args)
			params[dept] = unit
			newList.push({
				params,
			})
		})
		return buildCaseGen(newList, args, 1)
	}

	interface Record {
		params?: unknown[]
		[key: string]: unknown
	}

	list.forEach((item: Record = {}) => {
		const { params = Array.from(args) } = item
		argMapList.forEach(unit => {
			const newParams = Array.from(params)
			newParams[dept] = unit
			newList.push({
				params: newParams,
			})
		})
	})

	return buildCaseGen(newList, args, dept + 1)
}

export function Cases<T = unknown>(...args: (BaseValueMapKey | T)[]) {
	return buildCaseGen([], args, 0)
}



export function CasesPlus<T = unknown>(...args: (BaseValueMapKey | T)[]) {
	const getDefaultCase = ({ params }: Record<string, any>) => {
		return { params }
	}
	const records: unknown[][] = [];

	const getTotal = <T>(args: T[], total = 1): number => {

		const getTotalUnit = (arg: string) => {
			const record = BaseValueMap.get(arg)
			if (record && record.length > 0) {
				records.push(record)
				total = total * record.length
			}
		}

		args.forEach(arg => {
			if (type(arg) === 'Object') {
				for (const key in arg) {
					const value = arg[key]
					if (type(value) === 'String') {
						getTotalUnit(value as string)
					}
				}
			}
			if (type(arg) === 'String') {
				getTotalUnit(arg as string)
				return
			}
		})

		return total
	}
	const total = getTotal(args)

	function getRestLen(list: unknown[][] = [], index: number): number {
		let result = 1

		list.forEach((item, i) => {
			if (i > index)
				result = result * item.length || 1
		})

		return result
	}

	const recordsToValueMaps = (records: unknown[][]) => {
		const itemLength: number = records.length
		const result: unknown[][] = new Array(total)
			.fill(new Array(itemLength)).map((item, index) => {
				return records.map((record, cIndex) => {
					const n = getRestLen(records, cIndex);
					const i = Math.floor(index / n);
					return record[i % record.length]
				})
			})

		return result
	}

	const valueMaps: unknown[][] = recordsToValueMaps(records)

	// console.log(valueMaps)

	function getParams(index) {
		const tempValue = valueMaps[index]
		let cur = 0

		return args.map(arg => {
			if (type(arg) === 'Object') {
				for (const key in arg as Record<string, any>) {
					const value = arg[key]
					if (type(value) === 'String' && BaseValueMap.get(value as string)) {
						(arg as Record<string, any>)[key] = tempValue[cur++]
					}
				}
			}

			if (type(arg) === 'String' && BaseValueMap.get(arg as string)) {
				return tempValue[cur++]
			}

			return arg
		})

	}

	const result: Record<'params', unknown[]>[] = new Array(total).fill({ params: args })
		.map((item, index) => {
			return {
				params: getParams(index)
			}
		})
	// const result: Record<'params', unknown[]>[] = []

	console.log(result[0]);

	return buildCaseGen([], args, 0)
}