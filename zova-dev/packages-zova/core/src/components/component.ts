import { defineAsyncComponent } from '@cabloy/vue-runtime-core';
import { useApp } from '../composables/useApp.js';

export const ZovaComponent = defineAsyncComponent(attrs => {
  return new Promise(resolve => {
    const moduleName = attrs!.__z_module as string;
    const componentName = attrs!.__z_name as string;
    const app = useApp();
    app.meta.module.use(moduleName).then(module => {
      resolve(module.resource.components[componentName] as any);
    });
  });
});
