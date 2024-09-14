import { BeanStyleBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class StyleLayoutDefault extends BeanStyleBase<ScopeModule> {
  cTab: string;

  protected async __init__() {
    this.cTab = this.$style({
      $nest: {
        '&:hover .tab-close': {
          display: 'block',
        },
        '.tab-close': {
          position: 'absolute',
          top: '-6px',
          right: '-6px',
        },
      },
    });
  }
}
