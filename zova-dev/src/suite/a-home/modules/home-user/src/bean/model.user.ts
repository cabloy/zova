import { Model, Use } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { ServiceUserEntity } from '../api/index.js';
import type { ModelAuth } from './model.auth.js';

@Model()
export class ModelUser extends BeanModelBase<ScopeModule> {
  user?: ServiceUserEntity;
  @Use('home-user.model.auth')
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
