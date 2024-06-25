import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageTodo } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StyleTodo extends ControllerPageTodo {}

@Local()
export class StyleTodo extends BeanStyleBase<ScopeModule> {
  styleTable;

  protected async __init__() {
    this.styleTable = this.$style({
      width: '100%',
      backgroundColor: '#cccccc',
      marginTop: '16px',
      $nest: {
        td: {
          backgroundColor: '#ffffff',
          padding: '6px',
        },
      },
    });
  }
}
