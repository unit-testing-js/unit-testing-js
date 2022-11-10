import { useRunTime } from './useRunTime'
import type { Func, CaseUnit } from "../type"
import { Testlogger, isEquals } from '../utils'

export async function useRun<Param, Tobe>(
	name: string, func: Func,
	...cases: CaseUnit<Param, Tobe>[]
) {

	const SuccessQue = []
	const WarnningQue = []
	const ErrorQue = []
	let totalRunTime = 0

	for (let i = 0; i < cases.length; i++) {
		let unit = cases[i]

		if (unit.before) {
			const res = await unit.before(unit)
			if (res) {
				unit = {
					...unit,
					...res
				}
			}
		}

		const {
			func: funcUnit,
			after,
			params = undefined, param, tobe, tobes,
			type = 'Normal', timeout = 2000
		} = unit

		if (!unit.name) {
			unit.name = name + ':' + i
		}
		const { result, runTime = -1 } = await useRunTime(
			funcUnit || func,
			...((Array.isArray(params)) ? params : [params || param])
		)

		if (runTime > 0) {
			totalRunTime += runTime
		}

		unit.run = {
			actual: result,
			runTime,
		}

		if (unit.beforeEqual) {
			const res = await unit.beforeEqual(unit)
			if (res) {
				unit = {
					...unit,
					...res
				}
			}
		}


		const { warningTobe, warningTobes } = unit
		/**
		 * 超时 warning
		 */
		if (
			(timeout !== 'Infinite' && runTime > timeout)
		) {
			unit.run.error = 'Time out'
			WarnningQue.push(unit)
			after && (await after(unit))
			continue;
		}

		/**
		 * 成功
		 */
		if (isEquals(result, tobe, tobes, type)) {
			unit.run.error = 'Success'
			SuccessQue.push(unit)
			after && (await after(unit))
			continue;
		}

		/**
		 * 警告
		 */
		if (isEquals(result, warningTobe, warningTobes, type)) {
			unit.run.error = 'Warring'
			WarnningQue.push(unit)
			after && (await after(unit))
			continue;
		}

		unit.run.error = 'Error'
		ErrorQue.push(unit)

	}

	Testlogger(name, SuccessQue, WarnningQue, ErrorQue, totalRunTime)

	return {
		name,
		SuccessQue,
		WarnningQue,
		ErrorQue,
		totalRunTime
	}
}