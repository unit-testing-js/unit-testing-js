import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import type { CaseUnit } from '..'
import { icon } from './icon'
import { logNotSuccess } from './logNotSuccess'

interface TestLoggerParam {
	name: string,
	SuccessQue: CaseUnit[],
	WarningQue: CaseUnit[],
	ErrorQue: CaseUnit[],
	totalRunTime: number
}

export function Testlogger(params: TestLoggerParam) {

	const { name = '', SuccessQue = [], WarningQue = [], ErrorQue = [], totalRunTime = 0 } = params

	let tagColor: Styles = 'Cyan'
	let tagFlag = 'Success'
	if (WarningQue.length > 0) {
		tagColor = 'Yellow'
		tagFlag = 'Warning'
	}
	if (ErrorQue.length > 0) {
		tagColor = 'Red'
		tagFlag = 'Error'
	}

	console.log(
		color(icon[tagFlag], tagColor) + ' ' +
		color(`${name}: `, tagColor, 'Bright') +
		color(`${SuccessQue.length} `, 'Green') +
		(WarningQue.length ? color(`${WarningQue.length} `, 'Yellow') : '') + ' ' +
		(ErrorQue.length ? color(`${ErrorQue.length}`, 'Red') : '') + ' ' +
		(tagFlag !== 'Success' ? color(`${totalRunTime || -1}`, 'Grey') : '')
	)
	logNotSuccess(WarningQue, tagColor, tagFlag)
	logNotSuccess(ErrorQue, tagColor, tagFlag)

}