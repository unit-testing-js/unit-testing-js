import type { Func } from '../type'

export interface useRunTime {
	result: any,
	runTime: number
}
export async function useRunTime(
	asyncFn: Func,
	...params: any[]
): Promise<useRunTime> {
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