import { BeanSimple } from '../../bean/beanSimple.js';
import { Constructable } from '../../decorator/type/constructable.js';
import { IMonkeyApp } from '../../types/interface/monkey.js';
import { AppError } from '../component/error.js';
import { AppLocale } from '../component/locale.js';
import { AppModule } from '../component/module.js';
import { AppUtil } from './util.js';

export class AppMeta extends BeanSimple {
  module: AppModule;
  util: AppUtil;
  locale: AppLocale;
  error: AppError;
  /** @internal */
  public appMonkey?: IMonkeyApp;

  protected __init__() {
    this.module = this.app.bean._newBeanSimple(AppModule, false);
    this.util = this.app.bean._newBeanSimple(AppUtil, false);
    this.locale = this.app.bean._newBeanSimple(AppLocale, false);
    this.error = this.app.bean._newBeanSimple(AppError, false);
  }

  /** @internal */
  public async initialize(Monkey: Constructable<IMonkeyApp>) {
    this.appMonkey = this.bean._newBeanSimple(Monkey, false);
  }
}
