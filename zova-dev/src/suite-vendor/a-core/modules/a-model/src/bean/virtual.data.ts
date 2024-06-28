import { Virtual } from 'zova';
import { BeanDataFirst } from './bean.data/bean.data.first.js';

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanDataFirst<TScopeModule> {}
