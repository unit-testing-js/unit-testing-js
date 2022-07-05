import { performance } from 'perf_hooks'

export interface RunTime {
	result: any,
	runTime: number
}
export async function runTime(
	asyncFn: (...args: any[]) => (Promise<any> | any),
	...params: any[]
): Promise<RunTime> {
	if (!performance) {
		return {
			result: await asyncFn(...params),
			runTime: -1
		}
	}
	const t0 = performance.now()
	const result = await asyncFn(...params)
	const t1 = performance.now()

	return {
		result,
		runTime: t1 - t0
	}
}