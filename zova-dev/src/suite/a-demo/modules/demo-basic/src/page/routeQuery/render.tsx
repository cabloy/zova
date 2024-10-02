import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderRouteQuery extends StyleRouteQuery {}

@Local()
export class RenderRouteQuery extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$query.name</td>
                <td>{this.$query.name}</td>
                <td>{typeof this.$query.name}</td>
              </tr>
              <tr>
                <td>$query.age</td>
                <td>{this.$query.age}</td>
                <td>{typeof this.$query.age}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-primary"
            onClick={() => {
              const name = this.$query.name === 'tom' ? 'kevin' : 'tom';
              const age = (this.$query.age ?? 0) + 1;
              const url = this.$router.resolvePath('/a/demo/routeQuery', {
                name,
                age,
              });
              this.$router.push(url);
            }}
          >
            Go to current page with different query value
          </button>
        </div>
      </ZPage>
    );
  }
}
