import { BeanRenderBase, Local } from 'zova';
import type { StyleTodo } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderTodo extends StyleTodo {}

@Local()
export class RenderTodo extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>{this.dataTodos.isFetching.toString()}</div>
        {this.dataTodos.data?.map(item => {
          return <div>{item.title}</div>;
        })}
      </div>
    );
  }
}
