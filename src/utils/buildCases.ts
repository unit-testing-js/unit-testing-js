import type { BaseValueMapKey } from '../constants'
import { BaseValueMap } from '../constants'
import { type } from 'abandonjs'
import type { CaseUnit } from '../type'

export type CaseMapUnit = {
	'$$type': string
	map: any[]
} | BaseValueMapKey | number | any

/**
 * 部分用例还无法通过, 请不要使用
 */
export function Cases<Param = any>(...args: (CaseMapUnit | Param)[]): CaseUnit[] {

	const caseMapList: Param[][] = []
	let total = 1

	function getCaseMapUnit(args) {
		if (type(args) === 'String') {
			const record = BaseValueMap.get(args as string)
			if (record && record.length > 0) {
				caseMapList.push(record as Param[])
				total = total * record.length
				return;
			}
		}

		if (type(args) === 'Object') {
			if (args['$$type']) {
				const _arg: Record<string, any> = args as Record<string, any>
				if (_arg.list.length > 0) {
					caseMapList.push(_arg.list)
					total = total * _arg.list.length
				}
				return
			}
			for (const key in args) {
				const value = args[key]
				if (['String', 'Array', 'Object'].includes(type(value))) {
					getCaseMapUnit(value)
				}
			}
			return;
		}

		if (type(args) === 'Array')
			args.forEach(arg => {
				getCaseMapUnit(arg)
			})
	}

	function getRestLen(index: number): number {
		let result = 1

		caseMapList.forEach((item, i) => {
			if (i > index)
				result = result * item.length || 1
		})

		return result
	}

	function getIndexValue(index: number): Param[] {
		const result: Param[] = []
		caseMapList.forEach((item, i) => {
			const len = item.length
			const restLen = getRestLen(i)
			result.push(item[Math.floor(index / restLen) % len])
		})
		return result
	}

	getCaseMapUnit(args)

	const result: CaseUnit[] = []

	for (let index = 0; index < total; index++) {

		const unitValues = getIndexValue(index)

		const setCaseMapUnit = (args) => {
			if (type(args) === 'String') {
				const record = BaseValueMap.get(args as string)
				if (record && record.length > 0) {
					return unitValues.shift()
				}
			}
			if (type(args) === 'Object') {
				if (args['$$type'] && args.list.length > 0)
					return unitValues.shift()
				for (const key in args) {
					const value = args[key]
					if (['String', 'Array', 'Object'].includes(type(value))) {
						args[key] = setCaseMapUnit(value)
					}
				}
				return { ...args }
			}

			if (type(args) === 'Array')
				return args.map(arg => {
					return setCaseMapUnit(arg)
				})

			return
		}

		result.push({ params: setCaseMapUnit([...args]) })
	}

	return result
}

// import { test } from '../..'
// import { filter } from 'abandonjs'

// test('filter-no-filterConditions', filter,
// 	...Cases<any>('@EMPTY', 123, '@EMPTY').map(item => {
// 		item.tobe = item.params
// 		item.params = [item.params]
// 		return item
// 	})
// )

// test('filter-filterConditions=Boolean', filter,
// 	...Cases<any>('@EMPTY', 123, '@EMPTY').map(item => {
// 		item.tobe = [123]
// 		item.params = [item.params, Boolean]
// 		return item
// 	})
// )

// test('filter-filterConditions=Object', filter,
// 	...Cases('@EMPTY', 123, '@EMPTY').map(item => {
// 		const tempValue = [...item.params]
// 		item.tobe = [{ ...tempValue }]
// 		item.params = [[tempValue, { ...tempValue }], { 1: 2 }]
// 		return item
// 	})
// )