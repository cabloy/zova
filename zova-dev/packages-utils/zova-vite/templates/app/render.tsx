import { BeanRenderBase, Cast, Local } from 'zova';
import type { ControllerPageApp } from './controller.js';

export interface RenderApp extends ControllerPageApp {}

@Local()
export class RenderApp extends BeanRenderBase {
  render() {
    return (
      <div key={Cast(this.app).updateCounter.value}>
        <router-view />
      </div>
    );
  }
}
