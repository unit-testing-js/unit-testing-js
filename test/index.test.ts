import { select, toArray } from 'rh-js-methods'
export * from '../src'

// import './result.test'

// import './test_0_2.test'
// import './mock.test'


const BaseValueMap = new Map<string, unknown[]>([
	['Empty', [null, NaN, undefined]],
	['Number', [0, 1, -1, Infinity, -Infinity]],
])


function bc(list: any[] = [], args: string[] = [], dept = 0) {
	if (dept === args.length) return list

	const newList: any[] = []
	const argMapList = toArray(BaseValueMap.get(args[dept]))

	if (dept === 0) {
		argMapList.forEach(unit => {
			const params = new Array(args.length)
			params[dept] = unit
			newList.push({
				params,
				tobe: true
			})
		})
		return bc(newList, args, 1)
	}

	list.forEach((item: any = {}) => {
		const { params = new Array(args.length), tobe = true } = item
		argMapList.forEach(unit => {
			const newParams = Array.from(params)
			newParams[dept] = unit
			newList.push({
				params: newParams,
				tobe
			})
		})
	})

	// console.log({ dept, newList })

	return bc(newList, args, dept + 1)
}

function buildCase(...args: string[]) {
	const cases: any[] = []
	// const paramsBase = new Array(args.length)
	// const pointers = new Array(args.length).fill(0)

	// let caseNum = 1
	console.log(bc(cases, args, 0));

	// args.forEach(arg => {
	// 	const item = { params: [], tobe: true }
	// 	caseNum = caseNum * (toArray(BaseValueMap.get(arg)).length || 1)
	// 	// cases.push(item)
	// })

	// console.log(paramsBase, caseNum);

	// console.log({ args })
	return cases
}

console.log(buildCase('Empty', 'Number'))
// console.log(BaseValueMap)