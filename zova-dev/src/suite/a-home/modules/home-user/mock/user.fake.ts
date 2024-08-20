import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __users = [{ username: 'admin', password: '111111', avatar: ':emoji:flower' }];

export default defineFakeRoute([
  {
    url: '/home/user/login',
    method: 'post',
    response: req => {
      const user = __users.find(item => item.username === req.body.username);
      if (!user) {
        return { code: 403, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
        data: {
          user: {
            username: user.username,
            avatar: user.avatar,
          },
          jwt: {
            accessToken: `accessToken-${user.username}`,
            refreshToken: `refreshToken-${user.username}`,
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
