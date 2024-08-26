import { BeanRenderBase, ClientOnly, iconh, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import {
  ConfigProvider,
  Layout,
  LayoutHeader,
  LayoutSider,
  Menu,
  MenuItem,
  StyleProvider,
  SubMenu,
} from 'ant-design-vue';
import { JSX } from 'vue/jsx-runtime';
import { ServiceMenuEntity } from '../../api/interface/menu.js';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity, levels: number[]) {
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
        icon={iconh(item.icon as any)}
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
  _renderMenuItems(items: ServiceMenuEntity[] | undefined, levels: number[]) {
    if (!items) return [];
    const domItems: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item, levels.concat(index + 1)));
    }
    return domItems;
  }
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
              <Layout>
                <LayoutSider>{this._renderMenu()}</LayoutSider>
                <router-view style="width:100%" />
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
