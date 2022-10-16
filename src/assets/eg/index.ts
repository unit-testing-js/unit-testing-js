/**
 * @description 用于占位的方法
 */
export function toBe(val){
	return val
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