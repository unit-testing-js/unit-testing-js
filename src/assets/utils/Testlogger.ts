import { color, Styles } from 'rh-color'
import { CaseUnit } from '../index'

const icon = {
	Success: '\u2714',
	Wanning: '\u0021',
	Error: '\u2718'
}


function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles, tagFlag) {
	list.forEach((unit: CaseUnit) => {
		if (list.length === 0) return;
		const { name = '', tobe } = unit
		const { actual, runTime = -1, error } = unit.run
		console.log(
			' ',
			color(icon[tagFlag], tagColor),
			color(` ${name} `, tagColor),
			'tobe:',
			tobe,
			'actual:',
			actual,
			color(` ${error}`, 'Red'),
			color(`${runTime}`, 'Grey'),
		)
	})
}


export function Testlogger(
	name: string,
	SuccessQue: CaseUnit[],
	WarnningQue: CaseUnit[],
	ErrorQue: CaseUnit[],
	totalRunTime: number
) {
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
		color(icon[tagFlag], tagColor),
		color(` ${name}: `, tagColor, 'Bright'),
		color(`${SuccessQue.length} `, 'Green'),
		color(`${WarnningQue.length} `, 'Yellow'),
		color(`${ErrorQue.length}`, 'Red'),
		color(`${totalRunTime || -1}`, 'Grey')
	)
	logNotSuccess(WarnningQue, tagColor, tagFlag)
	logNotSuccess(ErrorQue, tagColor, tagFlag)

}