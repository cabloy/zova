import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

let todos = [
  { id: 'xxx', title: 'Coding', done: false },
  { id: 'yyy', title: 'Running', done: true },
];

export default defineFakeRoute([
  {
    url: '/demo/todo/select',
    method: 'get',
    response: _req => {
      return {
        code: 0,
        message: 'Success',
        data: todos,
      };
    },
  },
  {
    url: '/demo/todo/get',
    method: 'get',
    response: req => {
      const data = todos.find(item => item.id === req.query.id);
      if (!data) return { code: 404, message: 'Not Found' };
      return {
        code: 0,
        message: 'Success',
        data,
      };
    },
  },
  {
    url: '/demo/todo/insert',
    method: 'post',
    response: req => {
      todos = [req.body as any].concat(todos);
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
  {
    url: '/demo/todo/update',
    method: 'post',
    response: req => {
      todos = todos.concat();
      const index = todos.findIndex(item => item.id === req.body.id);
      if (index > -1) {
        todos.splice(index, 1, req.body as any);
      }
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
  {
    url: '/demo/todo/delete',
    method: 'post',
    response: req => {
      todos = todos.concat();
      const index = todos.findIndex(item => item.id === req.body.id);
      if (index > -1) {
        todos.splice(index, 1);
      }
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
]);
