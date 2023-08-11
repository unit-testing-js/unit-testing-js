import { test } from '../../src'
import { toArray } from 'abandonjs'

test('02', toArray,
	{ params: [123], tobe: [123] },
	// { params: [null], tobe: [-Infinity] },
	{ params: [true], tobe: [true] },
	{ params: [1], tobe: [1] },
	{ params: [10], tobe: [10] },
	{ params: ['template'], tobe: ['template'] },
	{ params: [[]], tobe: [] },
	{ params: [{}], tobe: [{}] },
	{ params: [false], tobe: [false] },
	{ params: [0], tobe: [0] },
	{ params: [-1], tobe: [-1] },
	// { params: [null], tobe: [null] },
	// { params: [NaN], tobe: [NaN] },
	// { params: [undefined], tobe: [undefined] },
	{ params: [''], tobe: [''] },
	{ params: [0], tobe: [0] },
	{ params: [0.00001], tobe: [0.00001] },
	{ params: [-0.00001], tobe: [-0.00001] },
	{ params: [1], tobe: [1] },
	{ params: [-1], tobe: [-1] },
	{ params: [99999], tobe: [99999] },
	{ params: [-99999], tobe: [-99999] },
	{ params: [Infinity], tobe: [-Infinity] },
	{ params: [-Infinity], tobe: [-Infinity] },
	{
		params: [1.7976931348623157e+308],
		tobe: [1.7976931348623157e+308]
	},
	{
		params: [-1.7976931348623157e+308],
		tobe: [-1.7976931348623157e+308]
	},
	{
		param: {
			a: 1,
			b: 2,
			c: 3,
		},
		tobe: {
			e: 4
		}
	}
)