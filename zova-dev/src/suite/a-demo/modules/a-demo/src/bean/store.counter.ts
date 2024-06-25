import { Store } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanPiniaStoreBase, PiniaStoreLike } from 'zova-module-a-pinia';
import { useCounterStore } from './counterStore.js';

export type StoreCounterLike = PiniaStoreLike<StoreCounter, typeof useCounterStore>;

@Store()
export class StoreCounter extends BeanPiniaStoreBase<ScopeModule> {
  protected async __init__() {
    await super.__init__(useCounterStore);
  }

  protected __dispose__() {}
}
