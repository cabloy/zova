import { BeanRenderBase, Local } from 'zova';
import type { ControllerCard } from './controller.js';

export interface RenderCard extends ControllerCard {}

@Local()
export class RenderCard extends BeanRenderBase {
  render() {
    return (
      <div>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.$emit('reset', new Date());
          }}
        >
          Reset Time
        </button>
        <div>
          <div class="bg-teal-600">
            <div>Slot: {this.$slots.header?.()}</div>
            <div>Prop: {this.$props.header}</div>
          </div>
          <div class="bg-teal-800">
            <div>Slot: {this.$slots.default?.()}</div>
            <div>Prop: {this.$props.content}</div>
          </div>
          <div class="bg-teal-900">
            <div>Slot: {this.$slots.footer?.()}</div>
            <div>Prop: {this.$props.footer}</div>
          </div>
        </div>
      </div>
    );
  }
}
