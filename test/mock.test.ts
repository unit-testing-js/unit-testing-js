import { test } from '../src'
import Mock from 'fakingjs'

const add = (a, b) => {
	console.log(a, b)
	return a + b
}

test('测试', add,
	{ params: Mock(['@num', '@num']), tobe: /^[0-9]*$/, type: 'Match' }
)
