import { UnitTest } from '..'

function tobe(a, b, c) {
	return a === b && b === c
}

UnitTest(tobe, 'tobe2')
	.setDefaultValue(false)
	.addParam(1)
	.addParamMap(
		[1, 2],
		[1, 3, 1]
	)
	.setMapValues(
		[1, 1, 1], true
	)
	.log('cases')
	.buildCases()
	.run()
