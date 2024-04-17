import { useContext } from './useContext.js';

export async function onMotherMounted(fn) {
  const ctx = useContext();
  await ctx.meta.state.mounted.wait();
  if (fn) {
    return await ctx.meta.util.instanceScope(fn);
  }
}
