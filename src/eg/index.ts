import { BaseValueMap } from '../constants'

/**
 * @description 用于占位的方法
 */
export function toBe(val) {
	return val
}

export function trueValue(...val: unknown[]): boolean {
	for (let i = 0; i < val.length; i++) {
		if (BaseValueMap.get('@EMPTY').includes(val[i])) {
			return false
		}
	}
	return true
}

export function falseValue(...val: unknown[]): boolean {
	for (let i = 0; i < val.length; i++) {
		if (!BaseValueMap.get('@EMPTY').includes(val[i])) {
			return false
		}
	}
	return true
}

/**
 * @description 测试使用方法
 */
export function add(...args: any[]) {
	return args.reduce((total, item) => {
		return total += item
	})
}

/**
 * @description 测试使用异步方法
 */

export async function asyncAdd(...args: any[]) {
	return new Promise(rs => {
		setTimeout(() => {
			rs(args.reduce((total, item) => {
				return total += item
			}))
		}, 100)
	})
}