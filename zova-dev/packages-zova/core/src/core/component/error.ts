import { ErrorClass } from '../../bean/resource/error/errorClass.js';
import { IErrorObject } from '../../bean/resource/error/errorObject.js';
import { IModuleError } from '../../bean/resource/error/type.js';

export class AppError extends ErrorClass {
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
