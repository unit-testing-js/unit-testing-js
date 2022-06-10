import { type } from 'rh-js-methods';
import { logResult, test, expect } from './index.test'
import { Mock } from 'rh-mock'

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

test({
	name:'测试',
	lang:'en_US'
},
	// expect(asyncFn).setParams(3, 4).tobe(9),
	// expect().mock('@name').tobe('123'),
	// expect((c, d) => {
	// 	let a = JSON.parse("123[")
	// 	let b= Number(NaN)
	// 	return 
	// }).setParams(1, 4).tobe(6),
	// expect(async (a, b) => a + b).setParams(1, 4).tobe(6),
	// expect((a, b) => a + b).setParams(1, 2).tobe(3),
	// expect(1).tobe(1),
	expect(1).tobeRegExp(/1/),
	// expect(1).tobeRegExp([/1/]),
	expect(1).tobeRegExps([/1/, /123/]),
	expect((a, b) => a + b).setParams(120, 3).tobeRegExps([/1/, /123/]),
	expect((a, b) => a + b).setParams(120, 3).tobes([/1/, /123/]),
	expect((a, b) => !(a + b)).setParams(120, 3).tobes([/1/, /123/, false, 123]),
	expect((a, b) => 1234).setParams(120, 3).tobes([/1/, /123/, false, 1234]),
	expect(1).tobeRegExps([/123/, /1/]),
	expect(123).tobes([null, 123]),
	expect(/1/).tobeRegExp(/1/),
	// expect(/1/).tobeRegExp(/1/),
	expect(1).tobeTruthy(),
	// expect(null).tobeTruthy(undefined, null),
	expect(0).tobeFalse(),
	// expect(1).tobeTruthy(),
	// expect('0').tobeTruthy(),
	// expect('').tobeFalse(),
	// expect(false).tobeFalse(),
	expect(1).tobeFalse(),
	// expect(undefined).tobeFalse(),
	// expect(undefined).tobeFalse(),
)

	// console.log(/123/.test('123'))
// console.log(type(()=>1))
// console.log(type(async ()=>1))


// console.log(typeof NaN )
// console.log(typeof 1 )
// console.log(typeof 1.0000 )