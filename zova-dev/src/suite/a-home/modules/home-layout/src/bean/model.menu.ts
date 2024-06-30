import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

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
              if (!item.to) return true;
              return this.$router.checkPathValid(item.to);
            });
            return item.children.length > 0;
          }
          if (!item.to) return true;
          return this.$router.checkPathValid(item.to);
        });
      },
    });
  }
}
