// Composables
import { useDisplay } from "./display.mjs"; // Utilities
import { onMounted, shallowRef } from 'vue';
import { IN_BROWSER } from "../util/index.mjs";
export function useHydration() {
  if (!IN_BROWSER) return shallowRef(false);
  const {
    ssr
  } = useDisplay();
  if (ssr) {
    const isMounted = shallowRef(false);
    const instance = getCurrentInstance();
    const zova = instance.appContext.app.zova;
    zova.ctx.meta.ssr.onHydrated(() => {
      isMounted.value = true;
    });
    return isMounted;
  } else {
    return shallowRef(true);
  }
}
//# sourceMappingURL=hydration.mjs.map