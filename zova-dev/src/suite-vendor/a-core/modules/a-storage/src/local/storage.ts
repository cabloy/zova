import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { VueQueryPlugin } from '@tanstack/vue-query';

@Local()
export class Storage extends BeanBase<ScopeModule> {
  protected async __init__() {
    this.app.vue.use(VueQueryPlugin);
  }

  protected __dispose__() {}
}
