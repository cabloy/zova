import { createVNode } from 'vue';
import { IIconRecord } from './types.js';
import { CabloyIcon } from './cabloyIcon.js';

export function renderIcon<K extends keyof IIconRecord>(name?: K, color?: string, size?: string | number) {
  size = size ?? 24;
  return createVNode(CabloyIcon, {
    name,
    color,
    width: size,
    height: size,
  });
}

export function getIcon<K extends keyof IIconRecord>(name: K): K {
  return name;
}
