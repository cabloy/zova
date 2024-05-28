import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerLayoutDefault, TypeMenuItem } from './controller.js';
import { App, ConfigProvider, Layout, LayoutHeader, LayoutSider, Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { JSX } from 'vue/jsx-runtime';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem, levels: number[]) {
    // key
    const key = levels.join('-');
    // folder
    if (item.folder) {
      const domItems = this._renderMenuItems(item.children, levels);
      return (
        <SubMenu key={key} title={item.title}>
          {domItems}
        </SubMenu>
      );
    }
    // item
    return (
      <MenuItem
        key={key}
        icon={this.$iconh(item.icon)}
        onClick={() => {
          if (item.href) {
            window.open(item.href);
          } else {
            this.$router.push(item.to!);
          }
        }}
      >
        {item.title}
      </MenuItem>
    );
  }
  _renderMenuItems(items: TypeMenuItem[] | undefined, levels: number[]) {
    if (!items) return [];
    const domItems: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item, levels.concat(index + 1)));
    }
    return domItems;
  }
  _renderMenu() {
    const domItems = this._renderMenuItems(this.menu, []);
    return (
      <Menu mode="inline" style={{ height: '100%' }}>
        {domItems}
      </Menu>
    );
  }

  render() {
    return (
      <ConfigProvider>
        <App>
          <Layout class="fill-height">
            <LayoutHeader style={{ color: 'white' }}>
              <div>Ant Design Vue</div>
            </LayoutHeader>
            <Layout>
              <LayoutSider>{this._renderMenu()}</LayoutSider>
              <Layout>
                <router-view />
              </Layout>
            </Layout>
          </Layout>
        </App>
      </ConfigProvider>
    );
  }
}
