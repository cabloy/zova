# Mock

Cabloy-Front provides an out-of-the-box `Mock` mechanism based on [vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server/), which can also support `development environment` and `production environment`

## Basic Usage

Cabloy-Front provides a module `a-homemock`, just provide the mock files in the directory `a-homemock/src/mock` as well

For example, there is an API: `/a/homemock/getMenu`, which provides the corresponding mock file as follows:

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

| 名称              | 说明                         |
| ----------------- | ---------------------------- |
| MOCK_ENABLED      | 是否启用mock                 |
| MOCK_PATH         | mock文件目录                 |
| MOCK_LOGGER       | 是否启用logger               |
| MOCK_BASE_NAME    | url前缀，默认是`/api`        |
| MOCK_BUILD        | 是否生成独立可部署的fake服务 |
| MOCK_BUILD_PORT   | fake服务的端口号             |
| MOCK_BUILD_OUTPUT | fake服务的输出目录           |
| MOCK_BUILD_CORS   | 是否启用`cors`跨域支持       |

## 生产环境

默认情况下，生产环境并不生成 fake 服务。如果需要在进行构建时生成 fake 服务，只需开启`MOCK_ENABLED`即可

```bash
$ npm run build
```

- 生成的 fake 服务自动输出到`MOCK_BUILD_OUTPUT`指定的目录中
- fake 服务的工作原理，请参见：[vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server/)
