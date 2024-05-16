import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherLayoutEmpty } from './mother.js';

export interface RenderLayoutEmpty extends MotherLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return <router-view />;
  }
}
