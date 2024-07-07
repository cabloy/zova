import { BeanRenderBase, Local, ZovaIcon, icon } from 'zova';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { StyleLayoutDefault } from './style.js';
import { JSX } from 'vue/jsx-runtime';
import { withModifiers } from 'vue';

export interface RenderTabs extends StyleLayoutDefault {}

@Local()
export class RenderTabs extends BeanRenderBase<ScopeModule> {
  _renderTabs() {
    if (!this.routerViewTabsRef) return;

    const domTabs: JSX.Element[] = [];
    for (const tab of this.routerViewTabsRef.$$modelTabs.tabs) {
      const className =
        tab.key === this.routerViewTabsRef.$$modelTabs.tabCurrentKey ? 'tab tab-active text-primary' : 'tab';
      const menuItem = this.$$modelMenu.findMenuItem(tab.key);
      if (!menuItem) continue;
      const titleLocal = this.app.meta.locale.getText(__ThisModule__, undefined, menuItem?.title || '');
      const domTab = (
        <a
          key={tab.key}
          role="tab"
          class={`${className} ${this.styleTab}`}
          onClick={() => {
            this.routerViewTabsRef.$$modelTabs.activeTab(tab);
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
                this.routerViewTabsRef.$$modelTabs.deleteTab(tab);
              }, ['stop'])}
            ></ZovaIcon>
          )}
        </a>
      );
      domTabs.push(domTab);
    }
    return (
      <div role="tablist" class="tabs tabs-lifted">
        {domTabs}
      </div>
    );
  }

  _renderContent() {
    const tabsOptions = this.scope.config.tabs;
    return (
      <this.$$scopeModuleATabs.component.routerViewTabs
        scene={tabsOptions.scene}
        max={tabsOptions.max}
        persister={tabsOptions.persister}
        getAffixTabs={() => {
          if (!this.$$modelMenu.select().data) return;
          return [{ key: '/a/home/home', affix: true }];
        }}
        controllerRef={ref => {
          this.routerViewTabsRef = ref;
        }}
      ></this.$$scopeModuleATabs.component.routerViewTabs>
    );
  }
}
