# zod

[zod](https://zod.dev) is typeScript-first schema validation with static type inference

Cabloy-Front 对`zod`进行了封装，提供了增强版的`zz`对象

## 基本用法

生成一个 string schema

```typescript
const name = zz.string();
```

指定为可选

```typescript
const name = zz.string().optional();
```

指定缺省值

```typescript
const name = zz.string().optional().default('');
```

## 常用类型

string

```typescript
const name = zz.string();
```

number

```typescript
const age = zz.number();
```

boolean

```typescript
const bRead = zz.boolean();
```

bigint

```typescript
const num = zz.bigint();
```

date

```typescript
const birthday = zz.date();
```

object

```typescript
const user = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});
```

## 增强功能

### 1. 类型转换

采用`zz`生成的 schema 自动执行类型转换。因为从路由路径上获取的 Params 和 Query 默认都是`字符串`类型，需要转换为实际的目标类型

### 2. boolean处理

`zz`对 boolean 进行了特殊处理，将字符串'false'、'undefined'、'null'和'0'都强制转换为`false`值

### 3. 支持json对象

我们可以在 Query 中传递 json 对象。比如，我们在 Query 中定义一个 user 对象

```typescript
export const QuerySchema = zz.object({
  user: zz
    .json({
      name: zz.string(),
      age: zz.number(),
    })
    .optional(),
});
```

在 render 中可以直接读取 user 对象的值

```typescript
export class RenderPageCardHeader {
  render() {
    return (
      <div>
        <div>name: {this.$query.user?.name}</div>
        <div>age: {this.$query.user?.age}</div>
      </div>
    );
  }
}
```

### 4. 支持array数组

我们可以在 Query 中传递 array 数组。比如，我们在 Query 中定义一个 colors 数组

```typescript
export const QuerySchema = zz.object({
  colors: zz.array(zz.string()).optional(),
});
```

在 render 中可以直接读取 colors 数组的值

```typescript
export class RenderPageCardHeader {
  render() {
    return (
      <div>
        <div>colors: {this.$query.colors?.join(',')}</div>
        <div>length: {this.$query.colors?.length}</div>
      </div>
    );
  }
}
```
