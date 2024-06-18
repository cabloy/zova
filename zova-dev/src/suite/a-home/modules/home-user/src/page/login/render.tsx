import { BeanRenderBase, Local } from 'zova';
import type { StyleLogin } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderLogin extends StyleLogin {}

@Local()
export class RenderLogin extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <form class={this.$class.textCenter}>
          <div>{JSON.stringify(this.user)}</div>
          <div>
            <label>UserName</label>
            <input v-model={this.user.username}></input>
          </div>
          <div>
            <label>Password</label>
            <input v-model={this.user.password} type="password"></input>
          </div>
          <div>
            <button
              type="submit"
              onClick={() => {
                this.login();
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
