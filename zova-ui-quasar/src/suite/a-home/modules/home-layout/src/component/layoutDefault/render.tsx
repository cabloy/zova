import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import EssentialLink from '../../component/essentialLink/index.vue';
import {
  QBtn,
  QDrawer,
  QHeader,
  QItemLabel,
  QLayout,
  QList,
  QPageContainer,
  QSeparator,
  QToolbar,
  QToolbarTitle,
} from 'quasar';
import { JSX } from 'vue/jsx-runtime';
import { ServiceMenuEntity } from '../../api/index.js';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity) {
    if (item.separator) {
      return <QSeparator spaced></QSeparator>;
    }
    if (item.folder) {
      return <QItemLabel header>{item.title}</QItemLabel>;
    }
    return (
      <EssentialLink
        key={item.title}
        title={item.title}
        caption={item.caption}
        icon={item.icon}
        href={item.href}
        to={item.to}
      />
    );
  }
  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems: JSX.Element[] = [];
    for (const item of queryMenus.data) {
      domItems.push(this._renderMenuItem(item));
    }
    return <QList>{domItems}</QList>;
  }

  render() {
    return (
      <QLayout view="lHh Lpr lFf">
        <QHeader elevated>
          <QToolbar>
            <QBtn flat dense round icon="::menu" aria-label="Menu" onClick={() => this.toggleLeftDrawer()} />

            <QToolbarTitle> Quasar App </QToolbarTitle>

            <div>Quasar v{this.$q.version}</div>
          </QToolbar>
        </QHeader>

        <QDrawer v-model={this.leftDrawerOpen} show-if-above bordered>
          {this._renderMenu()}
        </QDrawer>

        <QPageContainer>
          <router-view />
        </QPageContainer>
      </QLayout>
    );
  }
}
