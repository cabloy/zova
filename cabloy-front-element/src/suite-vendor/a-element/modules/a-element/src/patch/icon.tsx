import { BeanBase, Local } from '@cabloy/front-core';
import { ScopeModule } from '../resource/this.js';
//import { VSvgIconCabloy } from './svg.js';

@Local()
export class PatchIcon extends BeanBase<ScopeModule> {
  public async initialize() {
    //this._patchSetup();
  }
}
