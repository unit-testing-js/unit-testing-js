export const MAX_VALUES_NUMBER = 1.7976931348623157e+308;
export const MIN_VALUES_NUMBER = -1.7976931348623157e+308;
export const DEFAULT_TIMEOUT = 5000 // 默认超时时间

export type BaseValueMapKey = '@EMPTY' | '@NUMBER' | '@TYPE'

export const BaseValueMap = new Map<BaseValueMapKey, unknown[]>([
	['@EMPTY', [null, NaN, undefined]],
	['@NUMBER',
		[
			0,
			0.00001, -0.00001,
			1, -1,
			99999, -99999,
			Infinity, -Infinity,
			MAX_VALUES_NUMBER, MIN_VALUES_NUMBER
		]
	],
	['@TYPE', [
		'String', 'Number', 'Array', 'Object',
		'Function', 'AsyncFunction', 'GeneratorFunction',
		'Date', 'RegExp', 'Undefined', 'NaN']
	],
])