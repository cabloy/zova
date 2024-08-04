import { BeanRenderBase, Local } from 'zova';
import type { StyleItem } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderItem extends StyleItem {}

@Local()
export class RenderItem extends BeanRenderBase<ScopeModule> {
  render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <this.$component.page>
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
      </this.$component.page>
    );
  }
}
