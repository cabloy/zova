import { ref, watchEffect } from 'vue';
import { useApp } from '../../../composables/useApp.js';
import { ZovaApplication } from '../../../core/index.js';
import { IIconInfo } from './types.js';

export function getCabloyIcon(iconName?: string, app?: ZovaApplication): IIconInfo | undefined {
  if (!app) app = useApp();
  return app.meta.icon.parseIconInfoSync(iconName);
}

export function useCabloyIcon(iconGetter: () => string | undefined) {
  const iconInfo = ref<IIconInfo>();
  const app = useApp();

  watchEffect(() => {
    iconInfo.value = getCabloyIcon(iconGetter(), app);
  });

  return { iconInfo };
}
