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
                    <td>{this.$query.private?.toString()}</td>
                    <td>{typeof this.$query.private}</td>
                  </tr>
                </tbody>
              </table>
              <div class="card-actions justify-end">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    this.togglePrivate();
                  }}
                >
                  Go to current page with different private value
                </button>
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
                    <th>Title</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>
                  {this.$query.todos?.map(item => {
                    return (
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.done}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </this.$component.page>
    );
  }
}
