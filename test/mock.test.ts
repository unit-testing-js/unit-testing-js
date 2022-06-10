import { logResult, test, expect } from './index.test'
import { Mock } from 'rh-mock'

const add = (a, b) => {
	console.log(a, b)
	return a + b
}

test({
	name: '测试',
},
	expect(add).mock('@num', '@num').tobeRegExp(/^[0-9]*$/)
)
