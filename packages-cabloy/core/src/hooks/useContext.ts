import { getCurrentInstance } from 'vue';
import { CabloyContext } from '../core/context/context.js';

export function useContext(): CabloyContext {
  const instance = getCurrentInstance();
  return instance?.cabloy as CabloyContext;
}
