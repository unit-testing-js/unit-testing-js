import { test, testFunc, expect, describe } from './index.test'

function pa(val: number) {
	return new Promise((r: (v: number) => void) => {
		r(val + 1)
	})
}

async function asyncFn(v1: number, v2: number) {
	const a = await pa(v1)
	const b = await pa(v2)

	return a + b
}

// describe('describe',
// 	test('a',
// 		expect((a,b)=>a+b).setParams(1,3).tobe(4)
// 	)
// )

// testFunc('test func', [async (a, b) => a + b, 'setParams', 'tobe'],
// 	[[1, 1], 1]
// )

test({
	name: '测试',
	// lang:'en_US'
},
	expect(asyncFn).setParams(3, 4).tobe(9),
	expect((c, d) => { }).setParams(1, 4).tobe(undefined),
	expect(async (a, b) => a + b).setParams(1, 4).tobe(5),
	expect((a, b) => a + b).setParams(1, 2).tobe(3),
	expect(1).tobe(1),
	expect(1).tobeRegExp(/1/),
	expect(1).tobeRegExp(/1/),
	expect(1).tobeRegExps([/1/, /123/]),
	expect((a, b) => a + b).setParams(120, 3).tobeRegExps([/1/, /123/]),
	expect((a, b) => a + b).setParams(120, 3).tobes([/1/, /123/]),
	expect((a, b) => !(a + b)).setParams(120, 3).tobes([/1/, /123/, false, 123]),
	expect((a, b) => 1234).setParams(120, 3).tobes([/1/, /123/, false, 1234]),
	expect(1).tobeRegExps([/123/, /1/]),
	expect(123).tobes([null, 123]),
	expect(/1/).tobeRegExp(/1/),
	expect(/1/).tobeRegExp(/1/),
	expect(1).tobeTruthy(),
	expect(null).tobeTruthy(undefined, null),
	expect(0).tobeFalse(),
	expect(1).tobeTruthy(),
	expect((a, b) => a + b > 1).setParams(1, 2).tobeTruthy(),
	expect((a, b) => a + b > 1).setParams(1, 2).tobeTruthy(3),
	expect((a, b) => a + b > 1).setParams(1, 2).tobeTruthy('false'),
	expect((a, b) => a - b).setParams(1, 2).tobe(-1),
	expect((a, b) => a - b).setParams(1, 2).tobeTruthy(3,23, -1),
	expect((a, b) => a - b).setParams(2, 2).tobeTruthy(3,23, 0),
	expect((a, b) => a - b>100).setParams(2, 2).tobeFalse(),
	expect((a, b) => a - b).setParams(2222, 22).tobeFalse(2200),
	expect('0').tobeTruthy(),
	expect('').tobeFalse(),
	expect(false).tobeFalse(),
	expect(1).tobeFalse(1),
	expect(undefined).tobeFalse(),
	expect(undefined).tobeFalse(),
)