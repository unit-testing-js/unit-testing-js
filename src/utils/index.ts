import { log, color, Styles } from 'rh-color'
import { Message } from '../assets/locales'
export * from './handleRun'

export function handlelog({ name, lang = 'zh_CN', successArr, warningArr, errorArr }) {


	let tagColor: Styles = 'Cyan'


	if (warningArr.length) {
		tagColor = 'Yellow'
		log('Yellow')(Message['MsgWarning'][lang])

		for (let i = 0; i < warningArr.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = warningArr[i] || []
			console.log(type)
			console.log(rest);

			log('Yellow')(`${name}  ${message[lang] || message}`)
		}
		console.log()

	}

	if (errorArr.length > 0) {

		tagColor = 'Red'
		log('Red')(Message['MsgError'][lang], ':')

		for (let i = 0; i < errorArr.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = errorArr[i] || []

			console.log(rest);

			log('Red')(`${name}  ${message[lang] || message}`)
		}
		console.log()

	}

	// color(`${results.length}`, 'White'), '/',
	console.log(
		color('\u27A4', tagColor,),
		color(` ${name}  `, tagColor, 'Bright'),
		color(`${successArr.length}`, 'Green'), '/',
		color(`${warningArr.length}`, 'Yellow'), '/',
		color(`${errorArr.length}`, 'Red')
	)

}