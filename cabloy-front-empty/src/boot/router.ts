import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const createHistory =
  process.env.APP_SERVER === 'true'
    ? createMemoryHistory
    : process.env.APP_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

export default createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
  history: createHistory(process.env.APP_ROUTER_BASE),
});
