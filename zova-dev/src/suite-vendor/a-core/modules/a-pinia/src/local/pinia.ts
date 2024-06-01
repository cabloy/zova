import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { createPinia } from 'pinia';

@Local()
export class Pinia extends BeanBase<ScopeModule> {
  pinia;

  protected async __init__() {
    this.pinia = createPinia();
    this.app.vue.use(this.pinia);
  }

  protected __dispose__() {}
}
