import { BeanRenderBase, ClientOnly, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { ConfigProvider, Layout, LayoutHeader, LayoutSider, Menu, StyleProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenu() {
    return (
      <ClientOnly
        v-slots={{
          placeholder: () => {
            return <div style={{ height: '100%' }}></div>;
          },
        }}
      >
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          items={this.menuTree?.children as any}
          v-model:selectedKeys={this.activeMenuItemKeys}
          v-model:openKeys={this.activeMenuSubKeys}
          onClick={menuItem => this.onMenuItemClick(menuItem)}
        ></Menu>
      </ClientOnly>
    );
  }

  render() {
    return (
      <StyleProvider cache={this.$antdvStyleCache}>
        <ConfigProvider theme={{ token: this.$token }}>
          <Layout class="fill-height">
            <LayoutHeader style={{ color: 'white' }}>
              <div>Ant Design Vue</div>
            </LayoutHeader>
            <Layout>
              <Layout class="ant-layout-has-sider">
                <LayoutSider>{this._renderMenu()}</LayoutSider>
                <RouterView style="width:100%" />
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
