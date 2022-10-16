import { test } from './index.test'
import { Mock } from 'rh-mock'

const add = (a, b) => {
	console.log(a, b)
	return a + b
}

test('测试', add,
	{ params: Mock(['@num', '@num']), tobe: /^[0-9]*$/, type: 'Match' }
)
