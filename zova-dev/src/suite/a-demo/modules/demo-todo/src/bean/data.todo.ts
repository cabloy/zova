import { Data, getBeanName } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanDataBase } from 'zova-module-a-data';

@Data()
export class DataTodo extends BeanDataBase<ScopeModule> {
  protected async __init__() {}

  select() {
    return this.$useQuery({
      queryKey: ['select'],
      queryFn: async () => {
        await this.app.meta.util.sleep(1000);
        return 100;
      },
    });
  }
}
