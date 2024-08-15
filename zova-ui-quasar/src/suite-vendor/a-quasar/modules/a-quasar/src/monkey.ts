import { BeanBase, BeanContainer, BeanSimple, Cast, IMonkeySystem } from 'zova';
import { PatchIcon } from './patch/icon.js';
import { ScopeModuleAStyle } from 'zova-module-a-style';
import { normalizeClass } from 'vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-quasar.tool.themeHandler';
    // icon
    const patchIcon = await bean._newBean(PatchIcon, false);
    await patchIcon.initialize();
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.ssr.onHydrated(() => {
        Cast(this.app.vue.config.globalProperties.$q).onSSRHydrated();
      });
      this.ctx.meta.ssr.onHydratePropHasMismatch((_el, key, clientValue, _vnode, _instance) => {
        if (key !== 'class') return clientValue;
        clientValue = normalizeClass(clientValue);
        if (!clientValue) return clientValue;
        return clientValue
          .split(' ')
          .filter(item => {
            return item.indexOf('dark') === -1;
          })
          .join(' ');
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.context._meta.bodyTags += `<script>
  var __prefersColorSchemeDarkLocal=localStorage.getItem('themedark');
  __prefersColorSchemeDarkLocal=__prefersColorSchemeDarkLocal?JSON.parse(__prefersColorSchemeDarkLocal):null;      
  var __prefersColorSchemeDark=__prefersColorSchemeDarkLocal??window.matchMedia('(prefers-color-scheme: dark)').matches;     
  if(__prefersColorSchemeDark){
    document.body.classList.remove('body--light')
    document.body.classList.add('body--dark')
  }else{
    document.body.classList.remove('body--dark')
    document.body.classList.add('body--light') 
  }
  document.currentScript.remove();
</script>"`;
      });
    }
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$q', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.vue.config.globalProperties.$q;
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
