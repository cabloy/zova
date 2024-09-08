import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

export default defineFakeRoute([
  {
    url: '/backend-api-test',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'Success',
        data: { message: 'Hello Zova' },
      };
    },
  },
]);
