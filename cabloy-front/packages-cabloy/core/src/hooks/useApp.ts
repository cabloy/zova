import { getCurrentInstance } from 'vue';
import { CabloyApplication } from '../core/index.js';

export function useApp(): CabloyApplication {
  const instance = getCurrentInstance();
  return instance?.appContext.app.cabloy as CabloyApplication;
}
