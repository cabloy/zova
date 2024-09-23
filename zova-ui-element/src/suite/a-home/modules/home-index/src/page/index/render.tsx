import { BeanRenderBase, Local } from 'zova';
import type { StyleIndex } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ElTooltip } from 'element-plus';

export interface RenderIndex extends StyleIndex {}

@Local()
export class RenderIndex extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div style="text-align: center;">
        <div>
          <ElTooltip content="Hello Zova">
            <div style="font-size: 36px;">Hello Zova</div>
          </ElTooltip>
          <div style="font-size: 24px;opacity:.4;">Less is more, while more is less</div>
        </div>
      </div>
    );
  }
}
