import { StateLock } from '../../../utils/stateLock.js';

export class IconGroup {
  public svg: string | undefined;
  public loaded: StateLock;

  constructor() {
    this.loaded = StateLock.create();
  }
}
