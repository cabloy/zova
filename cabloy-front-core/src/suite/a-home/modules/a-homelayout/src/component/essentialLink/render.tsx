import { BeanRenderBase, CabloyIcon, Local } from '@cabloy/front';
import type { MotherEssentialLink } from './mother.js';
import { RouterLink } from 'vue-router';

export interface RenderEssentialLink extends MotherEssentialLink {}

@Local()
export class RenderEssentialLink extends BeanRenderBase {
  _renderLink() {
    const domContent = [
      <CabloyIcon name={this.$props.icon} height={24} width={24}></CabloyIcon>,
      <span>{this.$props.title}</span>,
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
