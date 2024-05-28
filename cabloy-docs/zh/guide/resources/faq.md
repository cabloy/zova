# 常见问题

## 为何bean实例变量名使用$$作为前缀 {#faq-$$}

通过 @Use 装饰器注入的 bean 实例，其变量名建议使用前缀`$$`。这样，bean 实例成员的变量名就会分为三个组，从而在写代码时通过自动完成可以非常快速的找到所需要的成员。变量名分组如下：

| 前缀 | 举例                    | 说明                                           |
| ---- | ----------------------- | ---------------------------------------------- |
| $$   | this.$$counter          | 通过 @Use 装饰器注入的 bean 实例               |
| $    | this.$api, this.$router | 通过基类BeanBase继承的成员，提供常用的系统能力 |
| 无   | this.count              | 当前bean实例的成员                             |

## 为何Vue组件bean类名使用controller作为前缀 {#faq-controller}

`index.vue`仅仅是用于定义 Vue 组件的壳，调用`useMother`函数之后，就把工作让渡给`controller.ts`了。如果需要的话，`props`、`emits`和`slots`的定义都在`controller.ts`中，而且大多数业务逻辑也会放入`controller.ts`中

这就好比狮子的行为：雄狮子是门面，干活的都是母狮子。因此，如果把`index.vue`看作是`father`的话，那么具体干活的就是`controller.ts`了
