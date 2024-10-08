import { BeanRenderBase, Local, Use } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import type { RenderLayoutDefault } from './render.jsx';

export interface RenderHeader extends StyleLayoutDefault {}

@Local()
export class RenderHeader extends BeanRenderBase<ScopeModule> {
  @Use()
  $$r: RenderLayoutDefault;

  render() {
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
        <div class="mx-2 flex-1 px-2">{this.$$r.$$renderTabs.render()}</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            {this.$$r.$$renderLocale.render()}
            {this.$$r.$$renderTheme.renderThemeDark()}
            {this.$$r.$$renderTheme.renderThemeName()}
            {this.$$r.$$renderUser.render()}
          </ul>
        </div>
      </div>
    );
  }
}
