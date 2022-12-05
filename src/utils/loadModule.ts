import { TestModuleLogger, Testlogger } from './Testlogger'
import { TestResultMap } from '..'

async function handleResult(timeout = 300) {
	setTimeout(() => {
		// console.log(TestResultMap)
		let successCaseNum = 0
		let successModuleNum = 0
		let warningCaseNum = 0
		let warningModuleNum = 0
		let errorCaseNum = 0
		let errorModuleNum = 0
		let totalRunTime = 0

		TestResultMap.forEach(item => {
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


// export async function loadModule(modules: string[]) {
export async function loadModule(load: () => Promise<any[]>, timeout = 300) {

	await load()
	await handleResult(timeout)

	// for (let i = 0; i < modules.length; i++) {
	// 	try {
	// 		await import(modules[i])
	// 	} catch (error) {
	// 		console.error(modules[i]+':loadError')
	// 	}
	// }



}