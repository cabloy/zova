import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            const __themeDarkStyle=window.__INITIAL_STATE__['data-ssr-theme-dark-'+window.ssr_themedark];
            const __themeDarkEl=document.createElement('style');
            __themeDarkEl.id='vuetify-theme-stylesheet';
            __themeDarkEl.innerHTML=__themeDarkStyle;
            document.head.appendChild(__themeDarkEl);
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        if (this.app.config.ssr.optimization.bodyReadyObserver) {
          this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  window.ssr_body_ready_condition=()=>{
    const __domHeader=document.querySelector('#q-app>.v-application>.v-application__wrap>header.v-toolbar');
    const __domDrawer=document.querySelector('#q-app>.v-application>.v-application__wrap>.v-navigation-drawer--left');
    const __domPageContainer=document.querySelector('#q-app>.v-application>.v-application__wrap>main.v-main');
    return __domHeader && __domDrawer && __domPageContainer;
  };
  window.ssr_body_ready_callback=()=>{
    const __belowBreakpoint=document.documentElement.clientWidth <= ${this.app.config.layout.sidebar.breakpoint};
    let __leftDrawerOpen;
    if(__belowBreakpoint){
      __leftDrawerOpen=false;
    }else{
      const __leftDrawerOpenPC=window.ssr_load_local('sidebarLeftOpenPC');
      __leftDrawerOpen=__leftDrawerOpenPC!==undefined?__leftDrawerOpenPC:${this.app.config.layout.sidebar.leftOpenPC};  
    }
    const __domHeader=document.querySelector('#q-app>.v-application>.v-application__wrap>header.v-toolbar');
    const __domDrawer=document.querySelector('#q-app>.v-application>.v-application__wrap>.v-navigation-drawer--left');  
    const __domPageContainer=document.querySelector('#q-app>.v-application>.v-application__wrap>main.v-main');
    if(__leftDrawerOpen){
      __domHeader.style.left='360px';
      __domHeader.style.width='calc(100% - 360px)';
      __domDrawer.style.transform='translateX(0px)';
      __domDrawer.style.width='360px';
      __domPageContainer.style.setProperty('--v-layout-left','360px');
      __domPageContainer.style.setProperty('--v-layout-top','64px');
    }else{
      __domPageContainer.style.setProperty('--v-layout-left','0px');
      __domPageContainer.style.setProperty('--v-layout-top','64px');
    }
    document.querySelector('#__leftDrawerOpenJS').remove();
  };
</script>`;
        }
      });
    }
  }
}
