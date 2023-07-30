import { test } from '../src'


// test('123')
test('123:a', () => 1, { param: true, tobe: true })
test('123:a', () => 2, { param: true, tobe: true })
test(() => 2, { param: true, tobe: true })
test('123:b', { param: true, tobe: true })
test(() => 1, { param: true, tobe: true })
