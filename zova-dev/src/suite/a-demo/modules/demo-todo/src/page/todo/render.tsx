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
            {this.queryTodos.data?.map(item => {
              return (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.done && iconh('::checkbox-checked')}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
