import { StateLock } from '@cabloy/front-core';

export class IconGroup {
  public svg: string | undefined;
  public loaded: StateLock;

  constructor() {
    this.loaded = StateLock.create();
  }
}
