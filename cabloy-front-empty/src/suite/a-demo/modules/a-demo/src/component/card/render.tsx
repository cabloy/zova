import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerCard } from './controller.js';

export interface RenderCard extends ControllerCard {}

@Local()
export class RenderCard extends BeanRenderBase {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.$emit('reset', new Date());
          }}
        >
          Reset Time
        </button>
        <div>
          <div style={{ backgroundColor: 'teal' }}>
            <div>Slot: {this.$slots.header?.()}</div>
            <div>Prop: {this.$props.header}</div>
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            <div>Slot: {this.$slots.default?.()}</div>
            <div>Prop: {this.$props.content}</div>
          </div>
          <div style={{ backgroundColor: 'green' }}>
            <div>Slot: {this.$slots.footer?.()}</div>
            <div>Prop: {this.$props.footer}</div>
          </div>
        </div>
      </div>
    );
  }
}
