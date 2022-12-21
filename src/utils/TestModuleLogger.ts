import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import { icon } from './icon'

export function TestModuleLogger(params: Record<string, any>) {
	const {
		name = 'TOTAL',
		successCaseNum,
		successModuleNum,
		warningCaseNum,
		warningModuleNum,
		errorCaseNum,
		errorModuleNum,
		totalRunTime = 0
	} = params

	let tagColor: Styles = 'Cyan'
	let tagFlag = 'Success'
	if (warningCaseNum > 0) {
		tagColor = 'Yellow'
		tagFlag = 'Warnning'
	}
	if (errorCaseNum > 0) {
		tagColor = 'Red'
		tagFlag = 'Error'
	}

	console.log(
		color(icon[tagFlag], tagColor) + ' ' +
		color(`${name}: `, tagColor, 'Bright') +
		'Module: ' + color(`${successModuleNum}/${successModuleNum + errorModuleNum + warningModuleNum}`, 'Green') + ' ' +
		'Case: ' + color(`${successCaseNum}/${successCaseNum + errorCaseNum + warningCaseNum}`, 'Green') + ' ' +
		(errorCaseNum > 0 ? color(`Error: ${errorModuleNum}-${errorCaseNum} `, 'Red') : '') +
		(warningCaseNum > 0 ? color(`Warning: ${warningModuleNum}-${warningCaseNum} `, 'Yellow') : '') +
		(tagFlag !== 'Success' ? color(`${totalRunTime || -1}`, 'Grey') : '')
	)

}