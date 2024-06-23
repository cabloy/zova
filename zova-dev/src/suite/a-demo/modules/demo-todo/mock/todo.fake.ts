import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const todos = [
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
      return {
        code: 0,
        message: 'Success',
        data: todos.find(item => item.id === req.query.id),
      };
    },
  },
]);
