/**
 * @description 测试组合的块
 * @param name  组合块名
 * @param callback 回调函数
 */
export function describe(name: string, callback: () => void) {
	console.log(name)
	callback()
}
