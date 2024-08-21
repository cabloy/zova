import { ErrorClass } from '../../bean/resource/error/errorClass.js';
import { IErrorObject } from '../../bean/resource/error/errorObject.js';
import { IModuleError, OnErrorHandler } from '../../bean/resource/error/type.js';

const SymbolErrorHandlers = Symbol('SymbolErrorHandlers');

export class AppError extends ErrorClass {
  private [SymbolErrorHandlers]: OnErrorHandler[] = [];

  /** @internal */
  public async initialize() {
    await super.initialize();
    this.app.vue.config.errorHandler = (err, instance, info) => {
      this[SymbolErrorHandlers].forEach(fn => fn(err, instance, info));
    };
  }

  /** @internal */
  public createScopeError(moduleScope: string, errorCode: number | string): IModuleError {
    const self = this;
    return {
      throw: (...args: any[]): never => {
        return self.throw(moduleScope, errorCode, ...args);
      },
      parseFail: (...args: any[]): IErrorObject => {
        return self.parseFail(moduleScope, errorCode, ...args);
      },
    };
  }
}
