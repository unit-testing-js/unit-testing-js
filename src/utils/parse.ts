import { type, stringify } from 'abandonjs'
import { color } from 'rh-color'

export function parse(value: unknown, parseArray = false) {
	if (type(value) === 'Array' && parseArray) {
		return (value as any[]).map(
			(item) => stringify(item) + color(` <${type(item)}>`, 'Grey')
		).join(', ')
	}
	return stringify(value)
}