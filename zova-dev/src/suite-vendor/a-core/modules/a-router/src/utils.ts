export function getRealRouteName(name?: string | symbol): string | undefined {
  if (!name) return undefined;
  name = String(name);
  if (name.startsWith('$:')) return undefined;
  return name;
}
