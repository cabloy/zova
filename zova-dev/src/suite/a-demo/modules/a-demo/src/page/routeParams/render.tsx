import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteParams } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderRouteParams extends StyleRouteParams {}

@Local()
export class RenderRouteParams extends BeanRenderBase<ScopeModule> {
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
                <td>$params.id</td>
                <td>{this.$params.id}</td>
                <td>{typeof this.$params.id}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-primary"
            onClick={() => {
              const id = this.$params.id + 1;
              const url = this.$router.resolveName('a-demo:routeParams', {
                params: { id },
              });
              this.$router.push(url);
            }}
          >
            Go to current page with different params value
          </button>
        </div>
      </ZPage>
    );
  }
}
