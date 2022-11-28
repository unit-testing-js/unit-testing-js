import { UnitTest, add } from '../src';

UnitTest(add, 'tobe')
	.setValues({
		0: 11,
		2: 13,
		4: 13,
		6: 13,
		5: 14,
		7: 14,
		8: 15
	})
	.defaultTobe(12)
	.addParam(1, 2, 3)
	.addParamMap({
		// type: '',
		list: [1, 2, 3]
	}, {
		list: [4, 5, 6]
	})
	.run()

// console.log(UnitTest)

// console.log(Object.entries({
// 	1: 'a',
// 	2: 'b'
// }))

// console.log(
// 	[ [ '1', 'a' ], [ '2', 'b' ] ]
// )