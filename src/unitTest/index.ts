import { stringify, type } from 'abandonjs'
import { _UnitTest } from './interface'

function getFunctionName(func: any) {
	if (type(func) !== 'Function') return 'Undefined'
	const functionReg = /function[\s]([0-9a-zA-Z]+)/
	const matchArray = functionReg.exec(stringify(func)) || []

	if (matchArray.length > 1) {
		return matchArray[1]
	}
	return 'Undefined'
}

export function UnitTest(func: any, name?: string) {
	if (name === undefined) {
		name = getFunctionName(func)
	}
	return new _UnitTest(func, name)
}