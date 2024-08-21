import { ComponentPublicInstance } from 'vue';
import { IErrorObject } from './errorObject.js';

export interface IModuleError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeModuleErrors<T> = {
  [prop in string & keyof T]: IModuleError;
};

export type OnErrorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => void;

export interface ErrorSSR extends Error {
  url?: string;
}
