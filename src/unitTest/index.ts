import { isEmpty } from 'abandonjs'
import { _UnitTest } from './interface'
import { getFunctionName } from '../utils'

export function UnitTest(func: any, name?: string) {
	if (isEmpty(name)) {
		name = getFunctionName(func)
	}
	return new _UnitTest(func, name)
}