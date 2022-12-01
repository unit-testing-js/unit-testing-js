import { test, Cases } from '../..'
import { filter } from 'abandonjs'

test('filter-no-filterConditions', filter,
	...Cases<any>('@EMPTY', 123, '@EMPTY').map(item => {
		item.tobe = item.params
		item.params = [item.params]
		return item
	})
)

test('filter-filterConditions=Boolean', filter,
	...Cases<any[]>('@EMPTY', 123, '@EMPTY').map(item => {
		item.tobe = [123]
		item.params = [item.params, Boolean]
		return item
	})
)

test('filter-filterConditions=Object', filter,
	...Cases('@EMPTY', 123, '@EMPTY').map(item => {
		const tempValue = [...item.params]
		item.tobe = [{ ...tempValue }]
		item.params = [[tempValue, { ...tempValue }], { 1: 2 }]
		return item
	})
)