import { BeanControllerLike } from './beanControllerLike.js';

export class BeanRenderBase<TScopeModule = unknown> extends BeanControllerLike<TScopeModule> {
  render() {
    return;
  }
}
