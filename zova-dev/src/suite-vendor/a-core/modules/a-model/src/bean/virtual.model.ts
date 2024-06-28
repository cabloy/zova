import { Virtual } from 'zova';
import { BeanModelFirst } from './bean.model/bean.model.first.js';

@Virtual()
export class BeanModelBase<TScopeModule = unknown> extends BeanModelFirst<TScopeModule> {}
