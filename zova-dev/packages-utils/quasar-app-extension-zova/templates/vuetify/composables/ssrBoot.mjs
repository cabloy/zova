// Utilities
import { computed, onMounted, readonly, shallowRef, getCurrentInstance } from 'vue';

// Composables
export function useSsrBoot() {
  const isBooted = shallowRef(false);
  const instance = getCurrentInstance();
  const zova = instance.appContext.app.zova;
  if (zova.config.env.ssr) {
    zova.ctx.meta.ssr.onHydrated(() => {
      isBooted.value = true;
    });
  } else {
    onMounted(() => {
      window.requestAnimationFrame(() => {
        isBooted.value = true;
      });
    });
  }
  const ssrBootStyles = computed(() =>
    !isBooted.value
      ? {
          transition: 'none !important',
        }
      : undefined,
  );
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted),
  };
}
//# sourceMappingURL=ssrBoot.mjs.map
