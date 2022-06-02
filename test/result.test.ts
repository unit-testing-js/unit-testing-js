import { logResult, test, expect } from './index.test'

// test('aa', [
// expect()
// ])

// test('', () => {
// 	console.log(123)
// })



console.log(
	expect(1).is(1),
	expect(0).is(undefined),
	expect(undefined).is(null),
	expect(NaN).is(false),
	expect(NaN).is(NaN),
	// expect()
)