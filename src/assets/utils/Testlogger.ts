import { color, Styles } from 'rh-color'
import { CaseUnit } from '../index'


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
		WarnningQue.forEach((unit: CaseUnit, index: number) => {
			const { name: iname } = unit
			const { actual, runTime } = unit.run
			console.log(
				color(`${name}:${iname || index} `, tagColor),
				actual,
				color(`${runTime}`, tagColor),
			)
		})
	}
	if (ErrorQue.length > 0) {
		tagColor = 'Red'
		ErrorQue.forEach((unit: CaseUnit, index: number) => {
			const { name: iname } = unit
			const { actual, runTime, error } = unit.run
			console.log(
				color(`${name}:${iname || index} `, tagColor),
				actual,
				color(`${runTime}`, tagColor),
				color(`${error}`, tagColor),
			)
		})
	}

	console.log(
		color('\u27A4', tagColor),
		color(` ${name}: `, tagColor, 'Bright'),
		color(`${SuccessQue.length} `, 'Green'),
		color(`${WarnningQue.length} `, 'Yellow'),
		color(`${ErrorQue.length}`, 'Red'),
		color(`${totalRunTime || -1}`, 'Cyan')
	)
}