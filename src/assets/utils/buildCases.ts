import type { BaseValueMapKey } from '../../constants'
import { BaseValueMap } from '../../constants'
import { type } from 'abandonjs'

type CaseMapUnit<T> = {
	'$$type': string
	map: unknown[]
} | BaseValueMapKey | T


/**
 * 部分用例还无法通过, 请不要使用
 */
export function Cases<T = unknown>(...args: CaseMapUnit<T>[]) {

	const caseMapList: any[][] = []
	let total = 1

	function getCaseMapUnit(args: any) {
		if (type(args) === 'String') {
			const record = BaseValueMap.get(args as string)
			if (record && record.length > 0) {
				caseMapList.push(record)
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

	function getIndexValue(index: number): unknown[] {
		const result: unknown[] = []
		caseMapList.forEach((item, i) => {
			const len = item.length
			const restLen = getRestLen(i)
			result.push(item[Math.floor(index / restLen) % len])
		})
		return result
	}

	getCaseMapUnit(args)

	const result: {
		params: CaseMapUnit<T>
		[key: string]: any
	}[] = []

	for (let index = 0; index < total; index++) {

		const unitValues = getIndexValue(index)
		// console.log(unitValues)

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

			return args
		}

		result.push({ params: setCaseMapUnit([...args]) })
	}

	// console.log('------')
	// console.log(caseMapList)
	// console.log('------')

	return result
}