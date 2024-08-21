import { BeanRenderBase, ClientOnly, Local, ZovaIcon, icon } from 'zova';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { StyleLayoutDefault } from './style.js';
import { JSX } from 'vue/jsx-runtime';
import { withModifiers } from 'vue';

export interface RenderTabs extends StyleLayoutDefault {}

@Local()
export class RenderTabs extends BeanRenderBase<ScopeModule> {
  _renderTabs() {
    const domTabs: JSX.Element[] = [];
    for (const tab of this.$$modelTabs.tabs) {
      const className = tab.key === this.$$modelTabs.tabCurrentKey ? 'tab tab-active text-primary' : 'tab';
      const menuItem = this.$$modelMenu.findMenuItem(tab.key);
      if (!menuItem) continue;
      const titleLocal = this.app.meta.locale.getText(__ThisModule__, undefined, menuItem?.title || '');
      const domTab = (
        <a
          key={tab.key}
          role="tab"
          class={`${className} ${this.styleTab}`}
          onClick={() => {
            this.$$modelTabs.activeTab(tab);
          }}
        >
          {!!menuItem?.icon && <ZovaIcon name={menuItem?.icon} width="24" height="24"></ZovaIcon>}
          {titleLocal}
          {!tab.affix && (
            <ZovaIcon
              class="tab-close hidden hover:bg-slate-400 rounded"
              name={icon('::close')}
              width="16"
              height="16"
              onClick={withModifiers(() => {
                this.$$modelTabs.deleteTab(tab);
              }, ['stop'])}
            ></ZovaIcon>
          )}
        </a>
      );
      domTabs.push(domTab);
    }
    return (
      <ClientOnly>
        <div role="tablist" class="tabs tabs-lifted">
          {domTabs}
        </div>
      </ClientOnly>
    );
  }

  _renderRouterViewTabs() {
    return <this.$$scopeModuleATabs.component.routerViewTabs></this.$$scopeModuleATabs.component.routerViewTabs>;
  }
}
