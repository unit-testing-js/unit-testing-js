import { color } from 'rh-color'
import type { Styles } from 'rh-color'
import type { CaseUnit } from '..'
import { type, stringify } from 'abandonjs'

const icon = {
	Success: '\u2714',
	Wanning: '\u0021',
	Error: '\u2718'
}

function parse(value: unknown, parseArray = false) {
	if (type(value) === 'Array' && parseArray) {
		return (value as any[]).map(
			(item) => stringify(item) + color(` <${type(item)}>`, 'Grey')
		).join(', ')
	}
	// if (type(value) === 'Object' && parseSpace) {
	// 	return '\n' + JSON.stringify(value, null, 2)
	// 		.split('\n')
	// 		.map(item => item.replace(/^(.)/, '    $1'))
	// 		.join('\n')
	// }
	// return stringify(value, null, 2)
	return stringify(value)
}

function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles, tagFlag) {
	list.forEach((unit: CaseUnit) => {
		if (list.length === 0) return;
		const { name = '', tobe, param, params } = unit
		const { actual, runTime = -1, error } = unit.run
		console.log(
			' ' + color(icon[tagFlag], tagColor) +
			color(` ${name} `, tagColor) +
			// color('actual:' + ' ' + parse(actual, false) + ' ', 'Magenta') +
			// color('tobe:' + ' ' + parse(tobe, false) + ' ', 'Cyan') +
			// color(`${error}`, 'Red') +
			color(` ${runTime}`, 'Grey')
		)
		if (param) {
			console.log(color('  param: ', 'Magenta') + parse(param))
		} else {
			console.log(color('  params: ', 'Magenta') + parse(params, true))
			// .replace(/^(\[)+|(\])+$/g, ''))
		}

		console.log(color('  tobe: ', 'Yellow') + parse(tobe) + color(` <${type(tobe)}>`, 'Grey'))
		console.log(color('  actual: ', 'Cyan') + parse(actual) + color(` <${type(actual)}>`, 'Grey'))
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
		'Module: ' + color(`${successModuleNum}/${successModuleNum + errorModuleNum + warningModuleNum}`, 'Green') + ' ' +
		'Case: ' + color(`${successCaseNum}/${successCaseNum + errorCaseNum + warningCaseNum}`, 'Green') + ' ' +
		(errorCaseNum > 0 ? color(`Error: ${errorModuleNum}-${errorCaseNum} `, 'Red') : '') + 
		(warningCaseNum > 0 ? color(`Warning: ${warningModuleNum}-${warningCaseNum} `, 'Yellow') : '') +
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