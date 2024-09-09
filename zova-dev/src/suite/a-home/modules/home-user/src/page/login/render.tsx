import { BeanRenderBase, Local } from 'zova';
import type { StyleLogin } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { withModifiers } from 'vue';

export interface RenderLogin extends StyleLogin {}

@Local()
export class RenderLogin extends BeanRenderBase<ScopeModule> {
  _renderLandingInfo() {
    return (
      <div class="min-h-full rounded-l-xl bg-base-200">
        <div class="py-12">
          <div class="max-w-md">
            <h1 class="text-3xl text-center font-bold">Zova</h1>
            <h5 class="text-2xl text-center opacity-40">Less is more, while more is less</h5>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div class="min-h-screen bg-base-200 flex items-center">
        <div class="card mx-auto w-full max-w-5xl  shadow-xl">
          <div class="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
            {this._renderLandingInfo()}
            <div class="py-24 px-10">
              <h2 class="text-2xl font-semibold mb-2 text-center">{this.scope.locale.Login()}</h2>
              <form
                onSubmit={withModifiers(() => {
                  this.login();
                }, ['prevent'])}
              >
                <div class="mb-4">
                  <label class="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      class="grow"
                      placeholder={this.scope.locale.YourUsername()}
                      v-model={this.user.username}
                    />
                  </label>
                  <label class="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="h-4 w-4 opacity-70"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <input type="password" class="grow" v-model={this.user.password} />
                  </label>
                </div>

                <button type="submit" class={'btn mt-2 w-full btn-primary'}>
                  {this.scope.locale.Login()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
