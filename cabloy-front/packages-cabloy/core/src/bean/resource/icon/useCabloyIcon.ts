import { ref, watchEffect } from 'vue';
import { useApp } from '../../../hooks/useApp.js';
import { Cast } from '../../../types/utils/cast.js';
import { CabloyApplication } from '../../../core/index.js';
import { IIconInfo } from './types.js';

export function getCabloyIcon(iconName?: string, app?: CabloyApplication): IIconInfo | undefined {
  if (!app) app = useApp();
  // iconName
  if (!iconName) return undefined;
  // empty
  const iconEmpty = { symbolId: '' } as IIconInfo;
  // icon store
  const beanIcon = app.bean._getBeanSync('a-icon.store.icon');
  if (!beanIcon) return iconEmpty;
  // icon info
  const iconInfo = Cast(beanIcon).parseIconInfoSync(iconName);
  return iconInfo;
}

export function useCabloyIcon(iconGetter: () => string | undefined) {
  const iconData = ref<IIconData>();
  const app = useApp();

  watchEffect(() => {
    iconData.value = getCabloyIcon(iconGetter(), app);
  });

  return { iconData };
}
