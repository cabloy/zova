import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';

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
}
