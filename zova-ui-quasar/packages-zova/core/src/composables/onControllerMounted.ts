import { useContext } from './useContext.js';

export async function onControllerMounted(fn) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error('run in the invalid context');
  }
  await ctx.meta.state.mounted.wait();
  if (fn) {
    return await ctx.meta.util.instanceScope(fn);
  }
}
