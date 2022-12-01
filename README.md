# 描述

- 添加测试用例来执行是否符合预期
- 快速生成想要的测试用例

## `test(name:string, func:Func, ...cases: CaseUnit)`

- 参数
  - `name`: 用例名
  - `func`: 待测试的方法
  - `...cases`: 测试用例

```ts
test(name, func, {...},{...}, ...)
// 可以打印出相应的结果
```
