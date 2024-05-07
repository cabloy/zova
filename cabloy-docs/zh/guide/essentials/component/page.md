# 页面组件

## 创建页面组件

我们先通过一个 Cli 命令来创建一个页面组件`counter`，该命令会创建一个路由和一个目录:

```bash
$ cabloy front:create:page counter
```

### 路由

`src/module/test-home/src/routes.ts`

```typescript{1,6}
import Counter from './page/counter/index.vue';
import { IModuleRoute } from 'cabloy-module-front-a-router';

export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- path: `counter`是相对路径，由于该页面组件属于模块`test-home`，因此其绝对路径是`/test/home/counter`

### 文件结构

在 Cabloy-Front 中，一个页面组件被切分为三个文件，位于刚才创建的目录`src/page/counter`
