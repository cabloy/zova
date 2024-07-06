import { BeanRenderBase, ZovaIcon, Local } from 'zova';
import type { ControllerEssentialLink } from './controller.js';
import { RouterLink } from 'vue-router';

export interface RenderEssentialLink extends ControllerEssentialLink {}

@Local()
export class RenderEssentialLink extends BeanRenderBase {
  _renderLink() {
    const domContent = [
      <ZovaIcon name={this.$props.icon} height={24} width={24}></ZovaIcon>,
      <div>
        <div>{this.$props.title}</div>
        {this.$props.caption && <div class="text-gray-400">{this.$props.caption}</div>}
      </div>,
    ];
    if (this.$props.href) {
      return (
        <a href={this.$props.href} target="_blank">
          {domContent}
        </a>
      );
    }
    return <RouterLink to={this.$props.to!}>{domContent}</RouterLink>;
  }

  render() {
    return this._renderLink();
  }
}
