import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherLayoutDefault, TypeMenuItem } from './mother.js';
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

export interface RenderLayoutDefault extends MotherLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem) {
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
    const domItems: JSX.Element[] = [];
    for (const item of this.menu) {
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
