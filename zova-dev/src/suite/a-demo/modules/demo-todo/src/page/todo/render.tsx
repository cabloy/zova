import { BeanRenderBase, Local, iconh } from 'zova';
import type { StyleTodo } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { withModifiers } from 'vue';

export interface RenderTodo extends StyleTodo {}

@Local()
export class RenderTodo extends BeanRenderBase<ScopeModule> {
  render() {
    const todoCurrent = this.$$modelTodo.get(this.currentTodo);
    return (
      <div>
        {todoCurrent?.data && (
          <div role="alert" class="alert alert-success">
            <span>Current: {todoCurrent?.data?.title}</span>
          </div>
        )}
        {!!todoCurrent?.error && (
          <div role="alert" class="alert alert-error">
            <span>{todoCurrent?.error?.message}</span>
          </div>
        )}
        <form>
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body items-center text-center">
              <input type="text" class="input input-bordered w-full max-w-xs" v-model={this.newTitle}></input>
              <div class="card-actions">
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
          </div>
        </form>
        <table class={this.styleTable}>
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
                      href="#"
                      onClick={withModifiers(() => {
                        this.currentTodo = { id: item.id };
                      }, ['prevent'])}
                    >
                      {item.title}
                    </a>
                  </td>
                  <td>{item.done && iconh('::checkbox-checked')}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.deleteTodo(item);
                      }}
                    >
                      Delete
                    </button>
                    {!item.done && (
                      <button
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
    );
  }
}
