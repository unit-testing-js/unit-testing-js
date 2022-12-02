# 描述

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
