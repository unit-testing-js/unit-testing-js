import { log, color } from 'rh-color'
import { Message } from '../assets/locales'
export * from './handleRun'

export function handlelog({ name, lang='zh_CN', results, successArr, warningArr, errorArr }) {
	console.log(
		color(`Name: ${name}`, 'Cyan'),
		color(`Total: ${results.length}`, 'Blue'),
		color(`Success: ${successArr.length}`, 'Green'),
		color('Warning: ' + warningArr.length, 'Yellow'),
		color('Error: ' + errorArr.length, 'Red')
	)

	if (warningArr.length) {
		console.log()
		log('Yellow')(Message['MsgWarning'][lang])

		for (let i = 0; i < warningArr.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = warningArr[i] || []

			console.log(rest);

			log('Yellow')(`${name}  ${message[lang] || message}`)
		}
	}

	if (errorArr.length > 0) {

		console.log()
		log('Red')(Message['MsgError'][lang], ':')

		for (let i = 0; i < errorArr.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = errorArr[i] || []

			console.log(rest);

			log('Red')(`${name}  ${message[lang] || message}`)
		}

	}
}