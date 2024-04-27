import { TypeModuleResourceErrors } from '../../../types/interface/module.js';
import { BeanSimple } from '../../beanSimple.js';
import { errorsInternal } from './errorInternal.js';

export class ErrorClass extends BeanSimple {
  /** @internal */
  public errors: Record<string, TypeModuleResourceErrors>;

  /** @internal */
  public async initialize() {
    this.errors = {};
  }

  // code/message,args
  throw(module, code, ...args): never {
    const body = this.parseFail(module, code, ...args);
    const err = new Error();
    err.code = body.code;
    err.message = body.message;
    if (body.code < 500) err.status = body.code;
    throw err;
  }
  // code/message,args
  parseFail(module, code, ...args) {
    if (typeof code === 'object') return code;
    return this.parseCode(module, 1, code, ...args);
  }
  // parseCode
  parseCode(module, codeDefault, code, ...args) {
    const ebError = this.errors[module];

    // convert from enum
    if (code && typeof code === 'string') {
      code = ebError[code];
    }

    if (code === undefined || code === null || code === '') {
      code = codeDefault;
    }

    let message: string;
    if (code <= 1000) {
      // todo:
      message = this.app.meta.text(errorsInternal[code], ...args);
    } else {
      message = this.app.meta.text(ebError[code], ...args);
    }

    code = __combineErrorCode(module, code);
    return { code, message };
  }
}

function __combineErrorCode(module, code) {
  if (typeof code !== 'number' || code <= 1000) return code;
  return module ? `${module}:${code}` : code;
}
