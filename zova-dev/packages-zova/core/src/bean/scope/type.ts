import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';
import { TypeModuleConstants } from '../resource/constant/type.js';
import { ZovaApplication } from '../../core/app/application.js';
import { TypeModuleComponents } from '../resource/component/type.js';
import { TypeModuleServices } from '../resource/index.js';

export type TypeModuleResource<
  COMPONENTS,
  CONFIG extends (app: ZovaApplication) => object,
  ERRORS,
  LOCALES,
  CONSTANTS = object,
  SERVICES = undefined,
> = {
  component: TypeModuleComponents<COMPONENTS>;
  config: TypeModuleConfig<CONFIG>;
  error: TypeModuleErrors<ERRORS>;
  locale: TypeModuleLocales<LOCALES>;
  constant: TypeModuleConstants<CONSTANTS>;
  service: TypeModuleServices<SERVICES>;
};
