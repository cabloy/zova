import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

export default defineFakeRoute([
  {
    url: '/home/user/login',
    method: 'post',
    response: req => {
      const now = Date.now();
      return {
        code: 0,
        message: 'Success',
        data: {
          user: {
            username: req.body.username,
            avatar: ':emoji:flower',
          },
          jwt: {
            accessToken: `accessToken-${now}`,
            refreshToken: `refreshToken-${now}`,
            expireTime: Date.now() + 2 * 3600 * 1000,
          },
        },
      };
    },
  },
  {
    url: '/home/user/logout',
    method: 'post',
    response: _req => {
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
]);
