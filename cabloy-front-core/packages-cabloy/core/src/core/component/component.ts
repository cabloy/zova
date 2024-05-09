import { BeanSimple } from '../../bean/beanSimple.js';
import { TypeModuleResourceComponents } from '../../types/interface/module.js';
import { Component, ComponentCustomOptions } from 'vue';

export class AppComponent extends BeanSimple {
  /** @internal */
  public async initialize() {}

  public createAsyncComponent(componentName: string) {
    return async () => {
      return await this.use(componentName);
    };
  }

  public async use(componentName: string): Promise<Component> {
    const [moduleName, componentName2] = componentName.split(':');
    const module = await this.app.meta.module.use(moduleName);
    return module.resource.components[componentName2];
  }

  /** @internal */
  public _registerComponents(_moduleName: string, components: TypeModuleResourceComponents) {
    if (!components) return;
    for (const key in components) {
      const component = components[key];
      this._setComponentGlobal(component);
    }
  }

  private _setComponentGlobal(component: Component) {
    // register
    const options = component as ComponentCustomOptions;
    if (component.name && options.meta?.global === true) {
      if (!this.app.vue.component(component.name)) {
        this.app.vue.component(component.name, component);
      }
    }
    return component;
  }
}
