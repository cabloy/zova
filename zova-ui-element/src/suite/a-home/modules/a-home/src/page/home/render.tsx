import { BeanRenderBase, Local } from 'zova';
import type { StyleHome } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ElTooltip } from 'element-plus';

export interface RenderHome extends StyleHome {}

@Local()
export class RenderHome extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div
        class="text-center"
        style={{
          width: '100%',
        }}
      >
        <div>
          <ElTooltip content="Hello Zova">
            <div style="font-size: 36px">Hello Zova</div>
          </ElTooltip>
          <div style="font-size: 24px;opacity:.4">Less is more, while more is less</div>
        </div>
      </div>
    );
  }
}
