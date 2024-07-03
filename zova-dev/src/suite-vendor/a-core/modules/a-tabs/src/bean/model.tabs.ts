import { Model, useComputed } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { RouteMeta } from 'vue-router';

export interface RouterTab {
  key: string;
  meta: RouteMeta;
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

  addTab(key: string, tab: RouterTab) {
    const [index] = this.findTab(key);
    if (index === -1) {
      const tabNew = { ...tab, updatedAt: Date.now() };
      if (this.tabCurrentIndex === -1) {
        this.tabs.push(tabNew);
      } else {
        this.tabs.splice(this.tabCurrentIndex + 1, 0, tabNew);
      }
    } else {
      this.tabCurrent!.updatedAt = Date.now();
    }
  }

  findTab(key?: string): [number, RouterTab | undefined] {
    if (!key) return [-1, undefined];
    const index = this.tabs.findIndex(item => item.key === key);
    if (index === -1) return [index, undefined];
    return [index, this.tabs[index]];
  }
}
