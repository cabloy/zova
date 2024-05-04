import { IErrorObject } from './errorObject.js';

export interface IModuleError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeModuleErrors<T> = {
  [prop in string & keyof T]: IModuleError;
};
