import { BeanBase, BeanContainer, BeanSimple, Cast, IMonkeySystem } from 'zova';
import { PatchIcon } from './patch/icon.js';
import { ScopeModuleAStyle } from 'zova-module-a-style';

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
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.context._meta.bodyTags += `<script>
  var __prefersColorSchemeDarkLocal=localStorage.getItem('themedark');
  __prefersColorSchemeDarkLocal=__prefersColorSchemeDarkLocal?JSON.parse(__prefersColorSchemeDarkLocal):null;      
  var __prefersColorSchemeDark=__prefersColorSchemeDarkLocal??window.matchMedia('(prefers-color-scheme: dark)').matches;     
  if(__prefersColorSchemeDark){
    document.body.classList.remove('body--light');
    document.body.classList.add('body--dark');
  }else{
    document.body.classList.remove('body--dark');
    document.body.classList.add('body--light');
  }
  document.currentScript.remove();
</script>`;
        this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  window.onload=function(){
  //debugger;
    var __belowBreakpoint=document.body.offsetWidth <= 1023;
    var __leftDrawerOpen;
    if(__belowBreakpoint){
      __leftDrawerOpen=false;
    }else{
      var __leftDrawerOpenPC=localStorage.getItem('leftDrawerOpenPC');
      __leftDrawerOpen=__leftDrawerOpenPC?JSON.parse(__leftDrawerOpenPC):true;  
    }
    if(__leftDrawerOpen){
      var __domHeader=document.querySelector('#q-app>.q-layout>.q-header');
      var __domDrawer=document.querySelector('#q-app>.q-layout>.q-drawer-container>.q-drawer--left');
      var __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
      __domHeader.style.left='300px';
      __domHeader.setAttribute('data-hydrate-props-server-first','');
      __domDrawer.style.transform='unset !important';
      __domDrawer.style.left='0px';
      __domDrawer.className=__domDrawer.className.replace('q-layout--prevent-focus ','');
      __domDrawer.setAttribute('data-hydrate-props-server-first','');
      __domPageContainer.style.paddingLeft='300px'; 
      __domPageContainer.setAttribute('data-hydrate-props-server-first','');
    }
    document.querySelector('#__leftDrawerOpenJS').remove();
  };      
</script>`;
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
