import { UnitTest, add } from '../../src';

UnitTest(add, 'tobe:a')
	.addParam({ a: 123, b: 234 })
	.setIndexValues({ 0: { a: 123, b: 234 } })
	.buildCases()
	.run()

UnitTest(add, 'tobe')
	.setDefaultValue(12)
	.addParamMap([11, 22])
	.addParam(-1)
	.addParamMap(
		[1, 2],
		[4, 5]
	)
	.addParam(1)
	.tobe(16, 17, 17, 18, 27, 28, 28)
	.setIndexValues({
		0: 16,
		15: 34,
		// 2: 13,
		// 4: 13,
		// 6: 13,
		// 5: 14,
		// 12: 35,
		17: 36
	})
	.setMapValues(
		[22, -1, 2, 5, 1], 29,
		[22, -1, 3, 5, 1, 2, 3], 35,
		[1, 2, 3, 3, 5], 14,
		[1, 2, 3, 2, 1], 12,
		[-1, 1, 2, 3, 1, 4], 10,
	)
	.buildCases()
	// .log('cases')
	.run()

0 && UnitTest(add, 'ob')
	.addParam({ a: 1, b: 2 })
	.tobe({ a: 1, b: 2 })
	.run()
