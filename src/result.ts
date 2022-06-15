import { TestResult, TestTotal } from './assets/type'
import { handlelog, handleRun } from './utils'

export async function logResult(testTotal: TestTotal) {

	const { name, lang = 'zh_CN', results = [] } = testTotal

	const successArr: TestResult[] = []
	const errorArr: TestResult[] = []
	const warningArr: TestResult[] = []

	for (let i = 0; i < results.length; i++) {

		const item: TestResult = results[i] || {}

		await handleRun.bind(item)(item)

		if (item && !item.name) {
			item.name = name + ' : ' + i
		}

		/*** error start ***/

		if (isNaN(Number(item.type))) {
			errorArr.push(item)
			continue;
		}



		if (/^1[0-9]{0,}$/.test(String(item.type))) {
			errorArr.push(item)
			continue
		}

		/*** error end ***/

		/*** warning start ***/

		/**
		 * 超时警告
		 */
		if (item.timeOut && item.runTime && item.runTime > item.timeOut) {
			item.setType.bind(item)('Timeout')
			warningArr.push(item)
			continue
		}


		if (/^2[0-9]{0,}$/.test(String(item.type))) {
			warningArr.push(item)
			continue
		}


		/*** warning end ***/

		/*** success start ***/

		if (/^0[0-9]{0,}$/.test(String(item.type))) {
			successArr.push(item)
			continue
		}
		/*** success end ***/
	}

	handlelog({
		name,
		lang,
		errorArr,
		successArr,
		warningArr,
	})
}
