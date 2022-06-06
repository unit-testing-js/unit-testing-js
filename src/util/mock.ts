import { TestResult } from '../assets/type';
import { Mock } from 'rh-mock'

export function mock(...args: any[]): TestResult {

	if (!args || args.length < 1) return this

	if (this.params === undefined) {
		this.params = []
	}

	if (!Array.isArray(this.params)) {
		this.params = [this.params]
	}

	args.forEach(item => {
		this.params.push(Mock(item))
	})


	return this
}

export function mockFormat(...args: any[]): TestResult {

	// if(args.length){

	// }
	console.log({ args })
	return this
}