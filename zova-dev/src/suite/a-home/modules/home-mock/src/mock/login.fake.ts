import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/home/user/login',
    method: 'post',
    response: req => {
      return {
        code: 0,
        message: 'Success',
        data: {
          user: {
            username: req.body.username,
            avatar: ':emoji:flower',
          },
          jwt: {
            accessToken: 'accessToken-xxxxx',
            refreshToken: 'refreshToken-xxxxx',
            expireTime: Date.now() + 2 * 3600 * 1000,
          },
        },
      };
    },
  },
]);
