import { ref, watchEffect } from 'vue';
import { useApp } from '../../../composables/useApp.js';
import { ZovaApplication } from '../../../core/index.js';
import { IIconInfo } from './types.js';

export function getZovaIcon(iconName?: string, app?: ZovaApplication): IIconInfo | undefined {
  if (!app) app = useApp();
  return app.meta.icon.parseIconInfoSync(iconName);
}

export function useZovaIcon(iconGetter: () => string | undefined) {
  const iconInfo = ref<IIconInfo>();
  const app = useApp();

  watchEffect(() => {
    iconInfo.value = getZovaIcon(iconGetter(), app);
  });

  return { iconInfo };
}
