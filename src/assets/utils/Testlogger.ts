import { color, Styles } from 'rh-color'
import { CaseUnit } from '../index'

function logNotSuccess(list: CaseUnit[] = [], tagColor: Styles) {
	list.forEach((unit: CaseUnit) => {
		const { name = '' } = unit
		const { actual, runTime = -1 } = unit.run
		console.log(
			color(`${name} `, tagColor),
			actual,
			color(`${runTime}`, tagColor),
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
	if (WarnningQue.length > 0) {
		tagColor = 'Yellow'
		logNotSuccess(WarnningQue, tagColor)
	}
	if (ErrorQue.length > 0) {
		tagColor = 'Red'
		logNotSuccess(ErrorQue, tagColor)
	}

	console.log(
		color('\u27A4', tagColor),
		color(` ${name}: `, tagColor, 'Bright'),
		color(`${SuccessQue.length} `, 'Green'),
		color(`${WarnningQue.length} `, 'Yellow'),
		color(`${ErrorQue.length}`, 'Red'),
		color(`${totalRunTime || -1}`, 'Grey')
	)
}