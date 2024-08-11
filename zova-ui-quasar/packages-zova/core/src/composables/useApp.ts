import { getCurrentInstance } from 'vue';
import { ZovaApplication } from '../core/index.js';

export function useApp(): ZovaApplication {
  const instance = getCurrentInstance();
  return instance?.appContext.app.zova as ZovaApplication;
}
