import NPMConfig from '@npmcli/config';
import { shorthands, definitions, flatten } from '@npmcli/config/lib/definitions';

let __registry: string;

export async function getRegistry() {
  if (!__registry) {
    const npmConfig = new NPMConfig({ npmPath: '', definitions, shorthands, flatten });
    await npmConfig.load();
    __registry = npmConfig.get('registry') || 'https://registry.npmjs.org/';
    if (__registry.charAt(__registry.length - 1) !== '/') {
      __registry = __registry + '/';
    }
  }
  return __registry;
}
