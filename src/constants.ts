export const MAX_VALUES_NUMBER = 1.7976931348623157e+308;
export const MIN_VALUES_NUMBER = -1.7976931348623157e+308;
export const DEFAULT_TIMEOUT = 5000 // 默认超时时间

/**
 * 空值
 * 数字
 * 字符串
 * 类型
 * Mock数据
 */

export type BaseValueMapKey = string

export const BaseValueMap = new Map<BaseValueMapKey, unknown[]>([
	['@Empty', [null, NaN, undefined]],
	['@Number', [0, 1, -1, Infinity, -Infinity]],
	['@Type', [
		'String', 'Number', 'Array', 'Object',
		'Function', 'AsyncFunction', 'GeneratorFunction',
		'Date', 'RegExp', 'Undefined', 'NaN']
	],
])