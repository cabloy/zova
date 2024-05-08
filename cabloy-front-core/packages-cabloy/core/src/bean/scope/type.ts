import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';
import { TypeModuleConstants } from '../resource/constant/type.js';
import { CabloyApplication } from '../../core/app/application.js';

export type TypeModuleResource<
  CONFIG extends (app: CabloyApplication) => object,
  ERRORS,
  LOCALES,
  CONSTANTS = object,
> = {
  config: TypeModuleConfig<CONFIG>;
  error: TypeModuleErrors<ERRORS>;
  locale: TypeModuleLocales<LOCALES>;
  constant: TypeModuleConstants<CONSTANTS>;
};
