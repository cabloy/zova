# FAQ

## Why do the bean instance variable names use $$ as the prefix {#faq-$$}

It is recommended that the variable names of bean instances injected through the `@Use` decorator use the prefix `$$`. In this way, the variable names of the bean instance members will be divided into three groups, so that the required members can be found very quickly through auto-completion when writing code. Variable names are grouped as follows:

| Prefix | Examples                | Description                                                                                    |
| ------ | ----------------------- | ---------------------------------------------------------------------------------------------- |
| $$     | this.$$counter          | Bean instances injected via @Use decorator                                                     |
| $      | this.$api, this.$router | Members inherited through the base class `BeanBase`, provide commonly used system capabilities |
| none   | this.count              | Members of the current bean instance                                                           |

## Why do the Vue component bean class names use controller as the prefix {#faq-controller}

`index.vue` is just a facade used to define Vue component. After invoking the `useController` function, the work is transferred to `controller.ts`. If necessary, the definitions of `props`, `emits` and `slots` are all in `controller.ts`, and most business logics will also be placed in `controller.ts`

This is just like the behavior of lions: the male lions are the facade, and the female lions do the work. Therefore, if you think of `index.vue` as `father`, then `controller.ts` is the one who actually does the work
