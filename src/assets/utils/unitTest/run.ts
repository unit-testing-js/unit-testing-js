import { useRun } from '../../hook'
import { Testlogger } from '../Testlogger'

function toParam(arg: any[], map: any[], sect: number[]) {
	let result = []
	let newArg = [...arg]
	let newMap = [...map]
	sect.forEach(num => {
		if (num > 0) {
			const _arg = newArg.splice(num)
			result = result.concat(newArg)
			newArg = _arg
			return
		}
		const _map = newMap.splice(-num)
		result = result.concat(newMap)
		newMap = _map
		return
	})
	return result
}

export function buildCases() {
	const { params = [], paramMaps, paramSection } = this

	let total = 1
	const caseMapList: any[][] = []

	paramMaps.forEach((item: any[]) => {
		const list = item
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

	for (let i = 0; i < total; i++) {
		const unitValues = getIndexValue(i)
		const _params = toParam(params, unitValues, paramSection)
		const tobe = this.getTobe(i, _params)
		this.cases.push({ params: _params, tobe })
	}

	return this
}


export async function run() {
	const { name, func, cases } = this
	const result = await useRun(name, func, ...cases)
	Testlogger(result)
}

export async function debug(...indexes: number[]) {
	const { name, func, cases } = this
	const result = await useRun(name, func,
		...cases.filter((item, index) => indexes.includes(index)))
	Testlogger(result)
}