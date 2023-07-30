import { stringify, type } from 'abandonjs'

export function getFunctionName(func: any) {
	if (type(func) !== 'Function') return 'Undefined'
	const functionReg = /function[\s]([0-9a-zA-Z]+)/
	const matchArray = functionReg.exec(stringify(func)) || []

	if (matchArray.length > 1 && matchArray[1].length > 0) {
		return matchArray[1]
	}

	return func.toString()
}
