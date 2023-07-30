import { useRunTime } from './useRunTime'
import type { Func, CaseUnit } from "../type"
import { isEquals } from '../utils'
import { parse } from '../utils/parse'
import { isEmpty } from 'asura-eye'

export async function useRun(
	name: string, func: Func,
	...cases: CaseUnit[]
) {

	const SuccessQue = []
	const WarningQue = []
	const ErrorQue = []
	let totalRunTime = 0

	// 遍历全部测试用例
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

		// 设置 测试用例 名
		if (isEmpty(unit.name)) {
			unit.name = name + ':' + i
		}

		unit.paramsString = parse(params, true)
		unit.paramString = parse(param)

		const { result, runTime = -1 } = await useRunTime(
			funcUnit || func,
			...((Array.isArray(params)) ? params : [params || param])
		)

		// 运行总时长计算
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


		/**
		 * 超时 warning
		 */
		if (runTime > timeout) {
			unit.run.error = 'Time out'
			WarningQue.push(unit)
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

		const { warningTobe, warningTobes } = unit
		/**
		 * 警告
		 */
		if (isEquals(result, warningTobe, warningTobes, type)) {
			unit.run.error = 'Warring'
			WarningQue.push(unit)
			after && (await after(unit))
			continue;
		}

		unit.run.error = 'Error'

		ErrorQue.push(unit)

	}


	return {
		name,
		SuccessQue,
		WarningQue,
		ErrorQue,
		totalRunTime
	}
}