# 描述

> 测试结果是否符合预期
> 功能待确定
> 使用观察者模式来收集运行结果, 再通过入口文件进行打印
>
> - 传入方法, mock 参数, 预期结果/结构

## 解析

```js
type Case = {
 name: stirng,
 params: any[]
 tobe: any
 type: 'equal'
}
test(name, func, ...caseUnit)
tests(name, func, [...caseUnits])
```

## 使用相关说明

| 提示    | 说明               |
| :------ | :----------------- |
| success | 结果和类型完全相同 |
| warning | 值相同, 类型不相同 |
| error   | 值不相同           |

## 更新日志

- 功能待确定中

<div class="exploded-line" />

## 预期结果种类

### 1. 完全相等

### 2. 类型相等
