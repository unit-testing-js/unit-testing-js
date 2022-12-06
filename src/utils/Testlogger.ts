import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import type { CaseUnit } from '..'
import { type, stringify } from 'abandonjs'

const icon = {
	Success: '\u2714',
	Wanning: '\u0021',
	Error: '\u2718'
}

function parse(value: unknown, parseSpace = true) {
	if (type(value) === 'Object' && parseSpace) {
		return '\n' + JSON.stringify(value, null, 2)
			.split('\n')
			.map(item => item.replace(/^(.)/, '    $1'))
			.join('\n')
	}
	return stringify(value)
}

function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles, tagFlag) {
	list.forEach((unit: CaseUnit) => {
		if (list.length === 0) return;
		const { name = '', tobe, param, params } = unit
		const { actual, runTime = -1, error } = unit.run
		console.log(
			' ' + color(icon[tagFlag], tagColor) + ' ' +
			color(`${name} `, tagColor) + ' ' +
			color('actual:' + ' ' + parse(actual, false) + ' ', 'Magenta') +
			color('tobe:' + ' ' + parse(tobe, false) + ' ', 'Cyan') +
			color(` ${error}`, 'Red') + ' ' +
			color(`${runTime}`, 'Grey')
		)
		if (param) {
			console.log(color('  param: ', 'Yellow') + parse(param))
		} else {
			console.log(color('  params: ', 'Yellow') + parse(params))
		}

		console.log(color('  tobe: ', 'Yellow') + parse(tobe))
		console.log(color('  actual: ', 'Yellow') + parse(actual))
	})
}

interface TestLoggerParam {
	name: string,
	SuccessQue: CaseUnit[],
	WarnningQue: CaseUnit[],
	ErrorQue: CaseUnit[],
	totalRunTime: number
}


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
		'Case: ' + color(`${successCaseNum}/${successCaseNum + errorCaseNum + warningCaseNum}`, 'Green') + ' ' +
		'Module: ' + color(`${successModuleNum}/${successModuleNum + errorModuleNum + warningModuleNum}`, 'Green') + ' ' +
		(warningCaseNum > 0 ? color(`Warning: ${warningCaseNum}`, 'Yellow') : '') +
		(warningModuleNum > 0 ? color(`WarningModule: ${warningModuleNum} `, 'Yellow') : '') +
		(errorCaseNum > 0 ? color(`Error: ${errorCaseNum}`, 'Red') : '') + ' ' +
		(errorModuleNum > 0 ? color(`ErrorModule: ${errorModuleNum}`, 'Red') : '') + ' ' +
		(tagFlag !== 'Success' ? color(`${totalRunTime || -1}`, 'Grey') : '')
	)

}

export function Testlogger(params: TestLoggerParam) {

	const { name = '', SuccessQue = [], WarnningQue = [], ErrorQue = [], totalRunTime = 0 } = params

	let tagColor: Styles = 'Cyan'
	let tagFlag = 'Success'
	if (WarnningQue.length > 0) {
		tagColor = 'Yellow'
		tagFlag = 'Warnning'
	}
	if (ErrorQue.length > 0) {
		tagColor = 'Red'
		tagFlag = 'Error'
	}

	console.log(
		color(icon[tagFlag], tagColor) + ' ' +
		color(`${name}: `, tagColor, 'Bright') +
		color(`${SuccessQue.length} `, 'Green') +
		(WarnningQue.length ? color(`${WarnningQue.length} `, 'Yellow') : '') + ' ' +
		(ErrorQue.length ? color(`${ErrorQue.length}`, 'Red') : '') + ' ' +
		(tagFlag !== 'Success' ? color(`${totalRunTime || -1}`, 'Grey') : '')
	)
	logNotSuccess(WarnningQue, tagColor, tagFlag)
	logNotSuccess(ErrorQue, tagColor, tagFlag)

}