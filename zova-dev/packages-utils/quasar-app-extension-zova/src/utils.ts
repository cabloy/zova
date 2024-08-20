import path from 'node:path';

export function resolveTemplatePath(file: string) {
  return new URL(path.join('../templates', file), import.meta.url);
}
