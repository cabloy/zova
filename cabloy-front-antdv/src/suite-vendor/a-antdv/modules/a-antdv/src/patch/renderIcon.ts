import { CabloyIcon, IIconRecord } from '@cabloy/front-core';
import { createVNode } from 'vue';

export function renderIcon<K extends keyof IIconRecord>(name?: K, color?: string, size?: string | number) {
  //size = size ?? 24;
  return createVNode(CabloyIcon, {
    name,
    color,
    width: size,
    height: size,
  });
}
