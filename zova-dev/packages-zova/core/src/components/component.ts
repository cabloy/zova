import { defineAsyncComponent } from 'vue';
import { useApp } from '../composables/useApp.js';

export function createZovaComponent(module, name) {
  return defineAsyncComponent(() => {
    return new Promise(resolve => {
      const app = useApp();
      app.meta.module.use(module).then(_module => {
        resolve(_module.resource.components[name] as any);
      });
    });
  });
}
