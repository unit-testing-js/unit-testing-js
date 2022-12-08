# unit-testing-js

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/unit-testing-js.svg?style=flat)](https://www.npmjs.com/package/unit-testing-js)

- 添加测试用例来执行是否符合预期
- 快速生成想要的测试用例

## `test`

- 参数
  - `param` `name` `{string}` 用例名
  - `param` `func` `{Func}` 待测试的方法
  - `params` `...cases` `{...CaseUnit}` 测试用例

```ts
test(name, func, {...},{...}, ...)
// 可以打印出相应的结果
```

### example

> 每一个测试用例单独配置

```js
// 待测试方法
function tobe(a,b){
  return a === b
}

// 配置测试用例
test('<name>', tobe, 
  { params, [1, 1], tobe: true},
  { params, [1, 1], tobe: true},
  // ...
)
```

## UnitTest

> 通过配置每一个参数位, 从而生成测试用例来进行测试

```js
import { UnitTest } from 'unit-testing-js'

// 待测试方法
function tobe(a, b, c) {
 return a === b && b === c
}

// 生成测试方法

UnitTest(tobe, 'tobe')
// 设置方法默认返回值
 .setDefaultValue(false)
//  设置函数第一个参数
 .addParam(1)
// 设置 函数 第二, 三个参数, 由于是两个数组, 就是设置两个参数, 且每一个参数都是有数组级的可能性
 .addParamMap(
  [1, 2],
  [1, 3, 1]
 )
//  通过参数设置结果
 .setMapValues(
  [1, 1, 1], true
 )
//  添加测试用例, 测试顺序下标 需要注意
//  .addCases(...)
 //  通过测试用例顺序设置结果
 // .tobe(...)
 // 通过测试用例下标设置结果
 // .setIndexValues({...})
//  生成测试用例
 .buildCases()
//  选择打印配置项目, 一般选择打印测试用例
//  .log('cases')
// 开始测试
 .run()
```

## loadModule

> - 当测试模块太多了, 就会打印太多
> - 加载测试模块
> - 只会打印有错误的模块

```js
import { loadModule, TestSetting } from '../src'

// 设置测试结果汇总
TestSetting.set('isSummary', true)

loadModule(async () => {
 import('./demo/01')
 import('./demo/02')
 import('./demo/03')
//  ...
})
```
