import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery2 } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouteQuery2 extends StyleRouteQuery2 {}

@Local()
export class RenderRouteQuery2 extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <div class="overflow-x-auto">
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">boolean: $query.private</h2>
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
                    <td>$query.private</td>
                    <td>{this.$query.private}</td>
                    <td>{typeof this.$query.private}</td>
                  </tr>
                </tbody>
              </table>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">json: $query.user</h2>
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
                    <td>$query.user?.name</td>
                    <td>{this.$query.user?.name}</td>
                    <td>{typeof this.$query.user?.name}</td>
                  </tr>
                  <tr>
                    <td>$query.user?.age</td>
                    <td>{this.$query.user?.age}</td>
                    <td>{typeof this.$query.user?.age}</td>
                  </tr>
                </tbody>
              </table>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">array: $query.todos</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.$query.todos?.map(item => {
                    <tr>
                      <td>$query.user?.age</td>
                      <td>{item.title}</td>
                      <td>{item.done}</td>
                    </tr>;
                  })}
                </tbody>
              </table>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          {/* <button
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
          </button> */}
        </div>
      </this.$component.page>
    );
  }
}
