import { UnitTest, add } from '../../src'


UnitTest(add, 'add:runByName')
	.addCases(
		{ name: 'a', params: [1, 2], tobe: 3 },
		{ name: 'a', params: [1, 2], tobe: 3 },
		{ name: 'a', params: [1, 2], tobe: 3 },
		{ name: 'a', params: [1, 2], tobe: 3 },
		{ name: 'b', params: [1, 2], tobe: 3 },
		{ groupName: 'c', params: [1, 2], tobe: 3 },
		{ groupName: 'c', params: [1, 2], tobe: 3 },
		{ groupName: 'c', params: [1, 2], tobe: 3 },
	)
	.run(['a', 'b', 'c'])