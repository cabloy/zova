import { BeanRenderBase, Local } from 'zova';
import type { StyleIndex } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderIndex extends StyleIndex {}

@Local()
export class RenderIndex extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div style="text-align: center;">
        <div>
          <div style="font-size: 36px;">Hello Zova</div>
          <div style="font-size: 24px;opacity:.4;">Less is more, while more is less</div>
        </div>
      </div>
    );
  }
}
