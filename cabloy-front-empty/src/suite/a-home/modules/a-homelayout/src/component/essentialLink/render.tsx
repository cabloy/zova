import { BeanRenderBase, CabloyIcon, Local } from '@cabloy/front-core';
import type { MotherEssentialLink } from './mother.js';
import { RouterLink } from 'vue-router';

export interface RenderEssentialLink extends MotherEssentialLink { }

@Local()
export class RenderEssentialLink extends BeanRenderBase {
  _renderLink() {
    const domContent = (
      <div>
        <CabloyIcon name={this.$props.icon}></CabloyIcon>
        <span>{this.$props.title}</span>
      </div>
    )
    if (this.$props.href) {
      return (
        <a href={this.$props.href} target='_blank'>{domContent}</a>
      )
    }
    return (
      <RouterLink to={this.$props.to!}>{domContent}</RouterLink>
    )
  }

  render() {
    return this._renderLink();
  }
}
