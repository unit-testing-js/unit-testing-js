// import { toArray } from 'rh-js-methods'

export type BaseValueMapKey = string

/**
 * 空值
 * 数字
 * 字符串
 * 类型
 * Mock数据
 */


export const BaseValueMap = new Map<BaseValueMapKey, unknown[]>([
	['@Empty', [null, NaN, undefined]],
	['@Number', [0, 1, -1, Infinity, -Infinity]],
	['@Type', [
		'String', 'Number', 'Array', 'Object',
		'Function', 'AsyncFunction', 'GeneratorFunction',
		'Date', 'RegExp', 'Undefined', 'NaN']
	],
])

function toArray(val) {
	if (Array.isArray(val))
		return val
	return []
}

function buildCaseGen(list: any[] = [], args: any[] = [], dept = 0) {
	if (dept === args.length) return list

	const newList: any[] = []
	const argMapList = toArray(BaseValueMap.get(args[dept]))

	if (argMapList.length === 0) {
		return buildCaseGen(list, args, dept + 1)
	}

	if (dept === 0) {
		argMapList.forEach(unit => {
			const params = Array.from(args)
			params[dept] = unit
			newList.push({
				params,
				tobe: true
			})
		})
		return buildCaseGen(newList, args, 1)
	}

	list.forEach((item: any = {}) => {
		const { params = Array.from(args), tobe = true } = item
		argMapList.forEach(unit => {
			const newParams = Array.from(params)
			newParams[dept] = unit
			newList.push({
				params: newParams,
				tobe
			})
		})
	})

	return buildCaseGen(newList, args, dept + 1)
}

export function buildCase(...args: any[]) {
	return buildCaseGen([], args, 0)
}

// console.log(buildCase('@Empty', '@Number', 3, 4, '@Empty'))
// console.log(BaseValueMap)
