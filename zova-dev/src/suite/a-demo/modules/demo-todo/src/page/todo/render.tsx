import { BeanRenderBase, Local } from 'zova';
import type { StyleTodo } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { withModifiers } from 'vue';
import { RouterLink } from 'vue-router';
import { ZPage } from 'zova-module-home-base';

export interface RenderTodo extends StyleTodo {}

@Local()
export class RenderTodo extends BeanRenderBase<ScopeModule> {
  render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <ZPage>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-success">
            <div>
              Current:{' '}
              <RouterLink to={this.$router.resolveName('demo-todo:item', { params: { id: todoCurrent?.data?.id } })}>
                {todoCurrent?.data?.title}
              </RouterLink>
            </div>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
        <form>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body flex-row">
              <input type="text" class="input input-bordered w-full max-w-xs" v-model={this.newTitle}></input>
              <button
                class="btn btn-primary"
                type="submit"
                onClick={withModifiers(() => {
                  this.addTodo();
                }, ['prevent'])}
              >
                Create
              </button>
            </div>
          </div>
        </form>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Done</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.$$modelTodo.select().data?.map(item => {
                return (
                  <tr>
                    <td>
                      <a
                        class="link link-primary"
                        href="#"
                        onClick={withModifiers(() => {
                          this.currentTodo = { id: item.id };
                        }, ['prevent'])}
                      >
                        {item.title}
                      </a>
                    </td>
                    <td>{item.done && <input type="checkbox" checked={true} class="checkbox checkbox-success" />}</td>
                    <td>
                      <button
                        class="btn btn-error btn-sm"
                        onClick={() => {
                          this.deleteTodo(item);
                        }}
                      >
                        Delete
                      </button>
                      {!item.done && (
                        <button
                          class="btn btn-success btn-sm"
                          onClick={() => {
                            this.completeTodo(item);
                          }}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ZPage>
    );
  }
}
