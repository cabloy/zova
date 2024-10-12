export function mutate<T>(target: T, fn: (copy: T) => T | undefined): T {
  if (!target) return target;
  const copy = (Array.isArray(target) ? target.slice() : Object.assign({}, target)) as T;
  const res = fn(copy);
  return res === undefined ? copy : res;
}
