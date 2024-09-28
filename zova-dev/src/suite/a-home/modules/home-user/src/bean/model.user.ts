import { Model, Use } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';
import { ModelAuth } from 'zova-module-home-user';
import { ServiceUserEntity } from '../service/user.js';

@Model()
export class ModelUser extends BeanModelBase<ScopeModule> {
  user?: ServiceUserEntity;
  @Use()
  $$modelAuth: ModelAuth;

  protected async __init__() {
    if (process.env.CLIENT) {
      this.user = this.$useQueryLocal({
        queryKey: ['user'],
      });
    } else {
      this.user = undefined;
    }
  }

  async ensureUser() {
    if (process.env.CLIENT) return this.user;
    if (!this.user && this.$$modelAuth.isAuthenticated) {
      const queryUser = this.getUserInfo();
      await queryUser.suspense();
      if (queryUser.isError) {
        this.$ssr.redirect('/login');
      }
      this.user = queryUser.data;
    }
    return this.user;
  }

  getUserInfo() {
    return this.$useQueryExisting({
      queryKey: ['user'],
      queryFn: async () => {
        return await this.scope.service.user.getUserInfo();
      },
    });
  }
}
