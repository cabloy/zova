import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouteQuery extends StyleRouteQuery {}

@Local()
export class RenderRouteQuery extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
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
                <td>this.$query.name</td>
                <td>{this.$query.name}</td>
                <td>{typeof this.$query.name}</td>
              </tr>
              <tr>
                <td>this.$query.age</td>
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
      </this.$component.page>
    );
  }
}
