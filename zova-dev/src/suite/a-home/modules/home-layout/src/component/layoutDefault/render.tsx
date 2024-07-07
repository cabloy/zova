import { BeanRenderBase, Local } from 'zova';
import type { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderLayoutDefault extends StyleLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase<ScopeModule> {
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
        <div class="mx-2 flex-1 px-2">{this.$$renderTabs._renderTabs()}</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            {this.$$renderLocale._renderLocale()}
            {this.$$renderTheme._renderThemeDark()}
            {this.$$renderTheme._renderThemeName()}
            {this.$$renderUser._renderUser()}
          </ul>
        </div>
      </div>
    );
  }

  _renderSidebar() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$renderMenu._renderMenu()}
      </div>
    );
  }

  render() {
    return (
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {this._renderHeader()}
          {this.$$renderTabs._renderContent()}
        </div>
        {this._renderSidebar()}
      </div>
    );
  }
}
