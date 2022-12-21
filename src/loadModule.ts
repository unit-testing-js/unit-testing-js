import { TestSetting, _TestResultMap } from './test'
import { TestModuleLogger } from './utils/TestModuleLogger'
import { Testlogger } from './utils/Testlogger'

async function handleResult(timeout = 300) {
	setTimeout(() => {
		let successCaseNum = 0
		let successModuleNum = 0
		let warningCaseNum = 0
		let warningModuleNum = 0
		let errorCaseNum = 0
		let errorModuleNum = 0
		let totalRunTime = 0

		_TestResultMap.forEach(item => {
			const { SuccessQue = [], ErrorQue = [], WarnningQue = [] } = item
			let flag = true
			successCaseNum += SuccessQue.length
			totalRunTime += item.totalRunTime || 0

			if (WarnningQue.length > 0) {
				warningCaseNum += WarnningQue.length
				warningModuleNum++
				flag = false
				Testlogger(item);
			}

			if (ErrorQue.length > 0) {
				errorCaseNum += ErrorQue.length
				errorModuleNum++;
				flag = false
				Testlogger(item);
			}

			if (flag) {
				successModuleNum++
			}

		})

		TestModuleLogger({
			successCaseNum,
			successModuleNum,
			warningCaseNum,
			warningModuleNum,
			errorCaseNum,
			errorModuleNum,
			totalRunTime
		})
	}, timeout)
}

export async function loadModule(load: () => Promise<void | any[]>, timeout = 300) {

	await load()
	if (TestSetting.get('isSummary')) {
		await handleResult(timeout)
	}

}