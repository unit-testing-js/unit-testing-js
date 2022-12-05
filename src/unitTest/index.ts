import { UnitTestInterface } from './interface'
import { run, buildCases, debug } from './run'
class _UnitTest extends UnitTestInterface {

	constructor(func: any, name: string) {
		super();
		this.func = func
		this.name = name
		this.run = run
		this.buildCases = buildCases
		this.debug = debug
	}

	log(...keys: (keyof _UnitTest)[]) {
		keys.forEach(item => {
			if (this[item]) {
				console.log(this[item])
			}
		})
		return this
	}
}

export function UnitTest(func: any, name: string) {
	return new _UnitTest(func, name)
}