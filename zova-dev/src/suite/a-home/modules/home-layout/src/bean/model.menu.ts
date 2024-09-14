import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';
import { ServiceMenuEntity } from '../service/menu.js';

@Model()
export class ModelMenu extends BeanModelBase<ScopeModule> {
  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        const data = await this.scope.service.menu.select();
        return data.filter(item => {
          if (item.children) {
            item.children = item.children.filter(item => {
              return this.$router.checkPathValid(item.to);
            });
            return item.children.length > 0;
          }
          return this.$router.checkPathValid(item.to);
        });
      },
    });
  }

  findMenuItem(key: string): ServiceMenuEntity | undefined {
    const menu = this.select().data;
    if (!menu) return;
    return this._findMenuItem(key, menu);
  }

  _findMenuItem(key: string, items: ServiceMenuEntity[]): ServiceMenuEntity | undefined {
    for (const item of items) {
      let menuItem;
      if (item.children) {
        menuItem = this._findMenuItem(key, item.children);
      } else {
        if (item.to && typeof item.to === 'object') {
          menuItem = item.to.name === key ? item : undefined;
        } else {
          menuItem = item.to === key ? item : undefined;
        }
      }
      if (menuItem) return menuItem;
    }
  }
}
