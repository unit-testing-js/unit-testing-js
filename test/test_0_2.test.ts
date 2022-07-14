import { test, add } from './index.test'

test('测试', add,
	{ param: 1, tobe: 1 },
	{ params: [1, 3], tobe: 4 },
	{name:'eg4',  params: [1, 3], tobe: 4 },
	{ params: [4, 3], tobe: /7/, type: 'RegExp' },
	{ params: [4, 5], tobes: [/7/, /9/], type: 'RegExp' },
)