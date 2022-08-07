import { color, Styles } from 'rh-color'
import { CaseUnit } from '../index'

const icon = {
	Success: '\u2714',
	Wanning: '\u0021',
	Error: '\u2718'
}


function logNotSuccess<Param, Tobe>(list: CaseUnit<Param, Tobe>[] = [], tagColor: Styles, tagFlag) {
	list.forEach((unit: CaseUnit<Param, Tobe>) => {
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


export function Testlogger<Param, Tobe>(
	name: string,
	SuccessQue: CaseUnit<Param, Tobe>[],
	WarnningQue: CaseUnit<Param, Tobe>[],
	ErrorQue: CaseUnit<Param, Tobe>[],
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
		WarnningQue.length ? color(`${WarnningQue.length} `, 'Yellow') : '',
		ErrorQue.length ? color(`${ErrorQue.length}`, 'Red'): '',
		tagFlag !== 'Success' ? color(`${totalRunTime || -1}`, 'Grey'): ''
	)
	logNotSuccess<Param, Tobe>(WarnningQue, tagColor, tagFlag)
	logNotSuccess<Param, Tobe>(ErrorQue, tagColor, tagFlag)

}