import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageApp } from './controller.js';

export interface RenderApp extends ControllerPageApp {}

@Local()
export class RenderApp extends BeanRenderBase {
  render() {
    return <router-view />;
  }
}
