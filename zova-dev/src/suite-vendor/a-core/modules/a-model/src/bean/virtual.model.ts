import { Virtual } from 'zova';
import { BeanDataFirst } from './bean.model/bean.model.first.js';

@Virtual()
export class BeanModelBase<TScopeModule = unknown> extends BeanDataFirst<TScopeModule> {}
