import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery2 } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderRouteQuery2 extends StyleRouteQuery2 {}

@Local()
export class RenderRouteQuery2 extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage>
        <div role="tablist" class="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="boolean"
            checked={this.$query.tabName === 'boolean'}
            onChange={event => {
              this.toggleTab(event, 'boolean');
            }}
          />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div class="card bg-base-100 w-96 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">$query.private</h2>
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
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="json"
            checked={this.$query.tabName === 'json'}
            onChange={event => {
              this.toggleTab(event, 'json');
            }}
          />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div class="card bg-base-100 w-96 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">$query.user</h2>
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
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      this.toggleUser();
                    }}
                  >
                    Go to current page with different user value
                  </button>
                </div>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="array"
            checked={this.$query.tabName === 'array'}
            onChange={event => {
              this.toggleTab(event, 'array');
            }}
          />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div class="card bg-base-100 w-96 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">$query.todos</h2>
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
                          <td>
                            <input type="checkbox" checked={item.done} class="checkbox checkbox-success" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      this.toggleTodos();
                    }}
                  >
                    Go to current page with different todos value
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ZPage>
    );
  }
}
