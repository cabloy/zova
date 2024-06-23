import { BeanRenderBase, Local } from 'zova';
import type { StyleLogin } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { withModifiers } from 'vue';

export interface RenderLogin extends StyleLogin {}

@Local()
export class RenderLogin extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <form class={this.$class.textCenter}>
          <div>
            <label>{this.scope.locale.YourUsername()}</label>
            <input v-model={this.user.username}></input>
          </div>
          <div>
            <label>{this.scope.locale.YourPassword()}</label>
            <input v-model={this.user.password} type="password"></input>
          </div>
          <div>
            <button
              type="submit"
              onClick={withModifiers(() => {
                this.login();
              }, ['prevent'])}
            >
              {this.scope.locale.Login()}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
