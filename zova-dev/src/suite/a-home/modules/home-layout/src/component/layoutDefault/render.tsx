import { BeanRenderBase, Local, ZovaIcon, icon, iconh } from 'zova';
import type { StyleLayoutDefault } from './style.js';
import { JSX } from 'vue/jsx-runtime';
import EssentialLink from '../essentialLink/index.vue';
import { ServiceMenuEntity } from '../../api/index.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { withModifiers } from 'vue';

export interface RenderLayoutDefault extends StyleLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase<ScopeModule> {
  _renderMenuItem(item: ServiceMenuEntity) {
    const titleLocale = this.app.meta.locale.getText(__ThisModule__, undefined, item.title);
    if (item.separator) {
      return <li></li>;
    }
    if (item.folder) {
      return (
        <li>
          <h2 class="menu-title">{titleLocale}</h2>
          <ul>{this._renderMenuItems(item.children)}</ul>
        </li>
      );
    }
    return (
      <li key={item.title}>
        <EssentialLink title={titleLocale} caption={item.caption} icon={item.icon} href={item.href} to={item.to} />
      </li>
    );
  }

  _renderMenuItems(items?: ServiceMenuEntity[]) {
    if (!items) return;
    const domItems: JSX.Element[] = [];
    for (const item of items) {
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }

  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems = this._renderMenuItems(queryMenus.data);
    return <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">{domItems}</ul>;
  }

  _renderLocale() {
    const locales = [
      {
        name: 'en-us',
        title: this.scope.locale.LanguageEnglish(),
      },
      {
        name: 'zh-cn',
        title: this.scope.locale.LanguageChinese(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh('::language')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {locales.map(item => {
              return (
                <li key={item.name} class={this.app.meta.locale.current === item.name ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.app.meta.locale.current = item.name as any;
                    }}
                  >
                    {iconh(this.app.meta.locale.current === item.name ? '::done' : '::none')}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }

  _renderThemeDark() {
    const themes = [
      {
        mode: false,
        title: this.scope.locale.ThemeLight(),
      },
      {
        mode: true,
        title: this.scope.locale.ThemeDark(),
      },
      {
        mode: 'auto',
        title: this.scope.locale.ThemeAuto(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh('::dark-theme')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {themes.map(item => {
              return (
                <li key={item.mode.toString()} class={this.$theme.darkMode === item.mode ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.$theme.darkMode = item.mode as any;
                    }}
                  >
                    {iconh(this.$theme.darkMode === item.mode ? '::done' : '::none')}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }

  _renderThemeName() {
    const themes = [
      {
        name: 'home-theme.theme.default',
        title: this.scope.locale.ThemeDefault(),
      },
      {
        name: 'a-demo.theme.orange',
        title: this.scope.locale.ThemeOrange(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh(':outline:theme-outline')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {themes.map(item => {
              return (
                <li key={item.name} class={this.$theme.name === item.name ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.$theme.name = item.name as any;
                    }}
                  >
                    {iconh(this.$theme.name === item.name ? '::done' : '::none')}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }

  _renderUser() {
    return (
      <li>
        <details>
          <summary>
            {this.$$modelUser.user?.username}
            {iconh(this.$$modelUser.user?.avatar as any)}
          </summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-32">
            <li>
              <a
                onClick={() => {
                  this.$$modelUser.logout().mutate();
                }}
              >
                {this.scope.locale.Logout()}
              </a>
            </li>
          </ul>
        </details>
      </li>
    );
  }

  _renderHeader() {
    return (
      <div class="navbar bg-base-300 w-full">
        <div class="flex-none lg:hidden">
          <label htmlFor="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">{this._renderTabs()}</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            {this._renderLocale()}
            {this._renderThemeDark()}
            {this._renderThemeName()}
            {this._renderUser()}
          </ul>
        </div>
      </div>
    );
  }

  _renderSidebar() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this._renderMenu()}
      </div>
    );
  }

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

  render() {
    return (
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {this._renderHeader()}
          {this._renderContent()}
        </div>
        {this._renderSidebar()}
      </div>
    );
  }
}
