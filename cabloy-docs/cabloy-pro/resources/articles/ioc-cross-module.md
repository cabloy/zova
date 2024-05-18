# A more elegant ioc than nestjs: Cross Module Access

## Preface

In the previous article, we created a business module `a-demo`, and used the dependency lookup mechanism to demonstrate how to elegantly define and use resources, including: Local services, Config, I18n and Error exceptions

In actual projects, we often encounter cross-module resource access scenarios. So, can dependency lookup mechanism of Cabloy-Pro5 still achieve cross-module access elegantly? Let's take a look

## Modular system and task description

The front and back ends of the Cabloy-Pro5 full-stack framework adopt a modular system. A Cabloy-Pro5 project consists of multiple business modules. Each business module can contain resources related to its own business, such as: Service service, Config configuration, international language resources, Error exception, middleware, scheduled tasks, message queue, System startup items, etc.

Here, we create a new business module `test-work` and access the resources provided by `a-demo` in `test-work`

## 1. Create a Business Module

```bash
cabloy api:create:module test-work
```

## 2. Create a API Endpoint

Create a set of files at the same time through one command

```bash
cabloy api:create:controller work
```

- Route: `src/module/test-work/src/routes.ts`
- Controller: `src/module/test-work/src/controller/work.ts`
- Service: `src/module/test-work/src/local/work.ts`

## 3. Access Services across modules

Next, we access the Service of the module `a-demo` in the newly created Service

```diff
export class LocalWork {
  async action({ user }) {
+   const scopeDemo = this.getScope('a-demo');
+   return scopeDemo.local.home.action({ user });
    // return user;
  }
}
```

1. Obtain the scope object of the module `a-demo` through the `getScope` method
2. Directly access the Service `home` through the scope object

Take a look at the animation demo, which provides complete type intelligent prompts:

![cross-module: Service](./images/cross-module-localbean.gif)

## 4. Access Config across modules

Access the Config configuration of the module `a-demo`

```diff
export class LocalWork {
  async action({ user }) {
    const scopeDemo = this.getScope('a-demo');
+   const prompt = scopeDemo.config.prompt;
    return scopeDemo.local.home.action({ user });
    // return user;
  }
}
```

1. Obtain the `prompt` value of config directly through `scopeDemo`

Take a look at the animation demo, which provides complete type intelligent prompts:

![cross-module: config](./images/cross-module-config.gif)

## 5. Access I18n across modules

Access the I18n resources of the module `a-demo`

```diff
export class LocalWork {
  async action({ user }) {
    const scopeDemo = this.getScope('a-demo');
+   const message = scopeDemo.locale.HelloWorld();
+   const message1 = scopeDemo.locale.HelloWorld.locale('en-us');
+   const message2 = scopeDemo.locale.HelloWorld.locale('zh-cn');
    return scopeDemo.local.home.action({ user });
    // return user;
  }
}
```

Take a look at the animation demo, which provides complete type intelligent prompts:

![cross-module: i18n](./images/cross-module-locale.gif)

## 6. Access Error Exception across modules

Access and throw the Error exception of the module `a-demo`

```diff
export class LocalWork {
  async action({ user }) {
    const scopeDemo = this.getScope('a-demo');
+   scopeDemo.error.Error001.throw();
    return scopeDemo.local.home.action({ user });
    // return user;
  }
}
```

1. Throw error exception `Error001` directly through `scopeDemo`

Take a look at the animation demo, which provides complete type intelligent prompts:

![cross-module: error exception](./images/cross-module-error.gif)

## Postscript

Cabloy-Pro5 uses `ioc` and `dependency lookup` mechanisms to reduce type annotations and achieve the effect of `making types invisible`, thus keeping our code elegant and concise, which in turn can significantly improve development efficiency and ensure code quality
