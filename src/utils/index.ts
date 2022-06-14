import { log, color } from 'rh-color'
import { messageMap } from '../assets/locales'
export * from './handleRun'

export function handlelog({ name, lang, resultlist, resultSuccess, resultWarning, resultError }) {
	console.log(
		color(`Name: ${name}`, 'Cyan'),
		color(` Total: ${resultlist.length}`, 'Blue'),
		color(` Success: ${resultSuccess.length}`, 'Green'),
		// color(' Warning: ' + resultWarning.length, 'Yellow'),
		color(' Error: ' + resultError.length, 'Red')
	)

	if (resultWarning.length) {
		console.log()
		log('Yellow')(messageMap.msgWarning[lang])

		for (let i = 0; i < resultWarning.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = resultWarning[i] || []

			console.log(rest);

			log('Red')(`${name}  ${message[lang] || message}`)
		}
	}

	if (resultError.length > 0) {

		console.log()
		log('Red')(messageMap.msgError[lang], ':')

		for (let i = 0; i < resultError.length; i++) {
			// eslint-disable-next-line
			const { name = '', message = '', type, ...rest } = resultError[i] || []

			console.log(rest);

			log('Red')(`${name}  ${message[lang] || message}`)
		}

	}
}