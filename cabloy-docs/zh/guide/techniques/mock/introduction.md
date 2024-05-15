# Mock

Cabloy-Front 基于[vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server/)提供了开箱即用的`Mock`机制，可同时支持`开发环境`和`生成环境`

## 基本用法

Cabloy-Front 提供了一个模块`a-homemock`，只需在目录`a-homemock/src/mock`当中提供 mock 文件即可

比如，有一个 API:`/a/homemock/getMenu`，提供对应的 mock 文件如下：

`src/suite/a-home/modules/a-homemock/src/mock/menu.fake.ts`

```typescript
import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/a/homemock/getMenu',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'Success',
        data: [],
      };
    },
  },
]);
```

- 文件后缀名是`.fake.ts`
- 使用`defineFakeRoute`方法是为了支持类型智能提示

## 配置

可以通过`.env`文件配置 mock

`env/.env`

```env
MOCK_ENABLED = true
MOCK_PATH = src/suite/a-home/modules/a-homemock/src/mock
MOCK_LOGGER = false
MOCK_BASE_NAME = $API_PREFIX
MOCK_BUILD = false
MOCK_BUILD_PORT = 8888
MOCK_BUILD_OUTPUT = distMockServer
MOCK_BUILD_CORS = true
```
