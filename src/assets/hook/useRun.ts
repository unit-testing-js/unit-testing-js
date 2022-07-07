import { useRunTime } from './useRunTime';
import { Func, CaseUnit } from "../type";
import { Testlogger, isEquals } from '../utils'

export async function useRun(name: string, func: Func, ...cases: CaseUnit[]) {

	const SuccessQue = []
	const WarnningQue = []
	const ErrorQue = []
	let totalRunTime = 0

	for (let i = 0; i < cases.length; i++) {
		const unit = cases[i]
		const { params = [], param, tobe, tobes, type = 'Normal', timeout = 2000 } = unit

		const { result, runTime = -1 } = await useRunTime(
			func,
			...(Array.isArray(params) ? params : [params || param])
		)

		if (runTime > 0) {
			totalRunTime += runTime
		}

		unit.run = {
			actual: result,
			runTime,
		}

		/**
		 * 超时 warning
		 */
		if (timeout !== 'Infinite' && runTime > timeout) {
			WarnningQue.push(unit)
			continue;
		}

		/**
		 * 成功
		 */
		if (isEquals(result, tobe, tobes, type)) {
			SuccessQue.push(unit)
			continue;
		}

		ErrorQue.push(unit)

	}

	Testlogger(name, SuccessQue, WarnningQue, ErrorQue, totalRunTime)
}