import { BeanRenderBase, Local } from 'zova';
import type { StyleErrorNotFound } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { RouterLink } from 'vue-router';

export interface RenderErrorNotFound extends StyleErrorNotFound {}

@Local()
export class RenderErrorNotFound extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class="text-center">
        <div>
          <div class={this.cTitle}>404</div>

          <div class={this.cDescription}>Oops. Nothing here...</div>

          <RouterLink to="/">Go Home</RouterLink>
        </div>
      </div>
    );
  }
}
