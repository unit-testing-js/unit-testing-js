import { log, Color } from 'rh-color'

export interface TestModule {
	name: string
	result: number[]
}

export const TestResult: TestModule[] = []

export function logResult(error: number, success: number, warning: number) {
	log(Color.Red)('Error Count: ' + error)
	log(Color.Green)('Success Count: ' + success)
	log(Color.Yellow)('Warning Count: ' + warning)
}
