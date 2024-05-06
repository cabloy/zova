import { BeanBase, IModule, Store } from '@cabloy/front';
import { Component, ComponentCustomOptions } from 'vue';

@Store()
export class StoreComponent extends BeanBase {
  /** @internal */
  public _registerComponents(module: IModule) {
    if (!module.resource.components) return;
    for (const key in module.resource.components) {
      const component = module.resource.components[key];
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
