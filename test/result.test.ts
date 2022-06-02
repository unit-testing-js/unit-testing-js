import { logResult, test, expect } from './index.test'
import { Mock } from 'rh-mock'


test('开发测试',
	expect().mock('@name').tobe('123'),
	expect((a, b) => a + b).setParams(1).runFunc(2).tobe(3),
	expect(1).tobe(1),
	// expect(0).tobe(undefined),
	expect(null).tobe(null),
	expect(1).tobeTruthy(null),
	expect(null).tobeTruthy(undefined, null),
	// expect(NaN).tobeFalse(NaN),
	// expect(false).tobeFalse(NaN, false),
	expect(0).tobeFalse(),
	expect(1).tobeTruthy(),
	expect('0').tobeTruthy(),
	expect('').tobeFalse(),
	expect(false).tobeFalse(),
	expect(NaN).tobeFalse(),
	expect(undefined).tobeFalse(),
	expect(undefined).tobeFalse(),
)