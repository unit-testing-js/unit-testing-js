import { UnitTest, test } from '../../src'

// s

UnitTest(() => undefined)
	.addCases(
		{ params: [undefined, undefined], tobe: undefined },
		{ name: 'a', params: [1, 2], tobe: undefined },
		{ name: 'a', params: [1, 2], tobe: undefined },
		{ name: 'a', params: [1, 2], tobe: undefined },
		{ name: 'b', params: [1, 2], tobe: undefined },
		// { name: 'b', params: [1, 2], tobe: 1 },
	)
	.run()

;test(() => undefined,
	{ params: [undefined, undefined], tobe: undefined },
	// { params: [undefined, undefined], tobe: 2222 },
	// { name: 'a', params: [1, 2], tobe: undefined },
	// { name: 'a', params: [1, 2], tobe: undefined },
	// { name: 'a', params: [1, 2], tobe: undefined },
	// { name: 'b', params: [1, 2], tobe: undefined },
)