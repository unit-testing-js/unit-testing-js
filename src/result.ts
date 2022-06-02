import { log, Color } from 'rh-color'
import { TestTotal } from './type'



export function logResult(testTotal: TestTotal) {
	const { 
		total = 0,
		resultError = [], 
		resultSuccess = [], 
		resultWarning = [] 
	} = testTotal

	log(Color.DarkGreen)('Valid Count: ' + total)
	log(Color.Green)('Success Count: ' + resultSuccess.length)
	if(resultWarning.length)
	log(Color.Yellow)('Warning Count: ' + resultWarning.length)
	
	
	if (resultError.length > 0) {
		log(Color.Red)('Error Count: ' + resultError.length)
		log(Color.Red)('错误详情:')
		for (let i = 0; i < resultError.length; i++) {
			const { name = '', message = '' } = resultError[i] || []
			
			console.log(resultError[i]);
			log(Color.Red)(`${name}--${message}`)
		}
	}
}
