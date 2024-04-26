import { reactive, watch } from '@cabloy/vue-runtime-core';

// eslint-disable-next-line
let __counter = 0;

export class StateLock {
  private _state: boolean;

  static create() {
    return reactive(new StateLock()) as StateLock;
  }

  protected constructor() {
    this._state = false;
    __counter++;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (this._state !== value) {
      this._state = value;
      __counter--;
      // console.log('-----lock counter: ', __counter);
    }
  }

  touch() {
    this.state = true;
  }

  async wait() {
    return new Promise(resolve => {
      // condition check should place in the promise inner
      if (this.state) return resolve(null);
      watch(
        () => this.state,
        () => {
          resolve(null);
        },
        { once: true },
      );
    });
  }
}
