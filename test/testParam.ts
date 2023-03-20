import { test } from '../src'


test('123')
test('123', () => 1, { param: true, tobe: true })
test('123', { param: true, tobe: true })
test(() => 1, { param: true, tobe: true })
