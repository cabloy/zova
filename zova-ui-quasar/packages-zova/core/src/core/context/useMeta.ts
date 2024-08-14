// from: quasar/ui/src/composables/use-meta.js
import { computed, watch, onActivated, onDeactivated, onUnmounted } from 'vue';
import { ZovaContext } from './context.js';
import { SSRMetaOptions, SSRMetaOptionsWrapper } from '../../types/interface/ssr.js';

export function useMeta(ctx: ZovaContext, metaOptions) {
  if (process.env.SERVER) {
    ctx.meta.ssr.context.__qMetaList.push(typeof metaOptions === 'function' ? metaOptions() : metaOptions);
  } else {
    const meta: SSRMetaOptionsWrapper = { active: true };

    if (typeof metaOptions === 'function') {
      const content = computed<SSRMetaOptions>(metaOptions);
      meta.val = content.value;

      watch(content, val => {
        meta.val = val;
        meta.active === true && ctx.meta.ssr.metaStore.planClientUpdate();
      });
    } else {
      meta.val = metaOptions;
    }

    ctx.meta.ssr.metaStore.addMetaOptions(meta);
    ctx.meta.ssr.metaStore.planClientUpdate();

    onActivated(() => {
      meta.active = true;
      ctx.meta.ssr.metaStore.planClientUpdate();
    });

    onDeactivated(() => {
      meta.active = false;
      ctx.meta.ssr.metaStore.planClientUpdate();
    });

    onUnmounted(() => {
      ctx.meta.ssr.metaStore.removeMetaOptions(meta);
      ctx.meta.ssr.metaStore.planClientUpdate();
    });
  }
}
