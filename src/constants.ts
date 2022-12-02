export const MAX_VALUES_NUMBER = 1.7976931348623157e+308;
export const MIN_VALUES_NUMBER = -1.7976931348623157e+308;
export const DEFAULT_TIMEOUT = 5000 // 默认超时时间

export type BaseValueMapKey =
	'@EMPTY' | '@TRUE' | '@FALSE'
	| '@NUMBER' | '@TYPE' | '@DATE' | '@PROMISE'
	| '@EMPTY_FUNCTION' | '@FUNCTION' | '@SIMPLE_PARAM'
	| string

export const _BaseValueMap_ = new Map<BaseValueMapKey, any[]>([
	['@EMPTY', [null, NaN, undefined]],
	['@TRUE', [true, 1, 10, 'template', [], {}]],
	['@FALSE', [false, 0, -1, null, NaN, undefined, '']],

	['@NUMBER',
		[
			0, 0.00001, -0.00001, 1, -1, 99999, -99999,
			Infinity, -Infinity,
			MAX_VALUES_NUMBER, MIN_VALUES_NUMBER
		]
	],
	['@TYPE', [
		'String', 'Number', 'Array', 'Object', 'Symbol', 'Proxy',
		'Function', 'AsyncFunction', 'GeneratorFunction',
		'Date', 'RegExp', 'Undefined', 'NaN', 'Promise', 'Null'
	]
	],
	['@DATE', [
		new Date(2022,12,2,4,13,14),
		1669900531674,
		1669900531,
		'1669900531674',
		'1669900531',
	]],
	['@EMPTY_FUNCTION', [
		function () { return },
		() => { return },
		async function () { return },
		async () => { return },
		function* () { yield undefined },
	]],
	['@FUNCTION', [
		function (val: unknown): unknown { return val },
		(val: unknown): unknown => { return val },
		async function (val: unknown): Promise<unknown> { return val },
		async (val): Promise<unknown> => { return val },
		function* (val: unknown) { yield val },
	]],
	['@SIMPLE_PARAM', [
		'', 0, [], {},
		class { },
		function () { return },
		() => { return },
		async function () { return },
		async () => { return },
		function* () { yield undefined },
		/.+/,
		new Date(),
	]]
])

export const BaseValueMap = {
	get: function (...keys: BaseValueMapKey[]): any[] {
		const result = keys.map(key => _BaseValueMap_.get(key))
		return [].concat(...result)
	}
}