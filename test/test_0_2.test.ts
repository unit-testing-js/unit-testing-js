import { test } from './index.test'

test('测试', (a, b) => a + b,
	{ params: [1, 3], tobe: 4 },
	{ params: [4, 3], tobe: /7/, type: 'RegExp' },
	{ params: [4, 5], tobe: [/7/, /9/], type: 'RegExps' },
)