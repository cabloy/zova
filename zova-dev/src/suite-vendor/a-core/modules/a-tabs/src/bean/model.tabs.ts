import { Model, useComputed } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

export interface RouterTab {
  key: string;
  title: string;
  icon?: string;
  updatedAt?: number;
}

@Model()
export class ModelTabs extends BeanModelBase<ScopeModule> {
  scene: string;
  tabs: RouterTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouterTab;

  protected async __init__(scene?: string) {
    // scene
    this.scene = scene || '';
    // tabs
    if (this.scope.config.persister) {
      this.tabs = this.$useQueryLocal({
        queryKey: [this.scene, 'tabs'],
        meta: { defaultData: [] },
      });
    } else {
      this.tabs = this.$useQueryMem({
        queryKey: [this.scene, 'tabs'],
        meta: { defaultData: [] },
      });
    }
    // tabCurrentKey
    if (this.scope.config.persister) {
      this.tabCurrentKey = this.$useQueryLocal({
        queryKey: [this.scene, 'tabCurrentKey'],
      });
    } else {
      this.tabCurrentKey = this.$useQueryMem({
        queryKey: [this.scene, 'tabCurrentKey'],
      });
    }
    // computed
    this.tabCurrentIndex = useComputed(() => {
      const [index] = this.findTab(this.tabCurrentKey);
      return index;
    });
    this.tabCurrent = useComputed(() => {
      const [, tab] = this.findTab(this.tabCurrentKey);
      return tab;
    });
  }

  addTab(tab: RouterTab) {
    // tabs
    const [index, tabOld] = this.findTab(tab.key);
    if (index === -1) {
      const tabNew = { ...tab, updatedAt: Date.now() };
      if (this.tabCurrentIndex === -1) {
        this.tabs = [...this.tabs, tabNew];
      } else {
        const tabsNew = this.tabs.slice(0, -1);
        tabsNew.splice(this.tabCurrentIndex + 1, 0, tabNew);
        this.tabs = tabsNew;
      }
    } else {
      const tabNew = { ...tabOld!, updatedAt: Date.now() };
      const tabsNew = this.tabs.slice(0, -1);
      tabsNew.splice(index, 1, tabNew);
      this.tabs = tabsNew;
    }
    // current
    this.tabCurrentKey = tab.key;
  }

  findTab(key?: string): [number, RouterTab | undefined] {
    if (!key) return [-1, undefined];
    const index = this.tabs.findIndex(item => item.key === key);
    if (index === -1) return [index, undefined];
    return [index, this.tabs[index]];
  }
}
