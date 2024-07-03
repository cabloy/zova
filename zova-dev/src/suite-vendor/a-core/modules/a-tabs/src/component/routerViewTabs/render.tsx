import { BeanRenderBase, Local } from 'zova';
import type { StyleRouterViewTabs } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { KeepAlive, Transition } from 'vue';

export interface RenderRouterViewTabs extends StyleRouterViewTabs {}

@Local()
export class RenderRouterViewTabs extends BeanRenderBase<ScopeModule> {
  render() {
    const slots = {
      default(Component) {
        return (
          <Transition>
            <KeepAlive>
              <Component.Component></Component.Component>
            </KeepAlive>
          </Transition>
        );
      },
    };
    return <router-view v-slots={slots}></router-view>;
  }
}
