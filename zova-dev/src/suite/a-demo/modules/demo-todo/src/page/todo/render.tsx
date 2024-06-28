import { BeanRenderBase, Local, iconh } from 'zova';
import type { StyleTodo } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { withModifiers } from 'vue';

export interface RenderTodo extends StyleTodo {}

@Local()
export class RenderTodo extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>Current: {this.$$modelTodo.get(this.currentTodo)?.data?.title}</div>
        <div>{this.$$modelTodo.get(this.currentTodo)?.error?.message}</div>
        <form>
          <input v-model={this.newTitle}></input>
          <button
            type="submit"
            onClick={withModifiers(() => {
              this.addTodo();
            }, ['prevent'])}
          >
            Create
          </button>
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
