import { BeanRenderBase, Local } from 'zova';
import type { StyleItem } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderItem extends StyleItem {}

@Local()
export class RenderItem extends BeanRenderBase<ScopeModule> {
  render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <ZPage>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-info">
            <div>Current: {todoCurrent?.data?.title}</div>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
      </ZPage>
    );
  }
}
