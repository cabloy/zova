import { ref, watchEffect } from 'vue';
import { useApp } from '../../../hooks/useApp.js';
import { Cast } from '../../../types/utils/cast.js';
import { CabloyApplication } from '../../../core/index.js';

export interface CabloyIconData {
  icon?: string;
}

export function getCabloyIcon(iconName?: string, app?: CabloyApplication): CabloyIconData | undefined {
  if (!app) app = useApp();
  // iconName
  if (!iconName) return undefined;
  // empty
  const iconEmpty: CabloyIconData = { icon: '' };
  // icon store
  const beanIcon = app.bean._getBeanSync('a-icon.store.icon');
  if (!beanIcon) return iconEmpty;
  // icon info
  const iconInfo = Cast(beanIcon).parseIconInfoSync(iconName);
  if (iconInfo === undefined) return undefined; // system handle
  // symbolId
  const symbolId = iconInfo.symbolId;
  if (symbolId === '') return iconEmpty;
  return { icon: symbolId };
}

export function useCabloyIcon(iconGetter: () => string | undefined) {
  const iconData = ref<CabloyIconData>();
  const app = useApp();

  watchEffect(() => {
    iconData.value = getCabloyIcon(iconGetter(), app);
  });

  return { iconData };
}
