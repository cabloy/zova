import { Model, useComputed } from 'zova';
import { BeanModelBase, UseQueryOptions } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { nextTick } from 'vue';

export interface RouterTab {
  key: string;
  fullPath: string;
  title?: string;
  icon?: string;
  updatedAt?: number;
}

export interface ModelTabsOptions {
  scene?: string;
  max?: number;
  persister?: boolean;
}

@Model()
export class ModelTabs extends BeanModelBase<ScopeModule> {
  tabsOptions: ModelTabsOptions;
  tabs: RouterTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouterTab;

  protected async __init__(options?: ModelTabsOptions) {
    // options
    this.tabsOptions = this._prepareTabsOptions(options);
    // tabs
    const queryOptionsTabs: UseQueryOptions<RouterTab[]> = {
      queryKey: [this.tabsOptions.scene, 'tabs'],
      meta: { defaultData: [] },
    };
    if (this.tabsOptions.persister) {
      this.tabs = this.$useQueryLocal(queryOptionsTabs);
    } else {
      this.tabs = this.$useQueryMem(queryOptionsTabs);
    }
    // tabCurrentKey
    const queryOptionsTabCurrentKey: UseQueryOptions<string> = {
      queryKey: [this.tabsOptions.scene, 'tabCurrentKey'],
    };
    if (this.tabsOptions.persister) {
      this.tabCurrentKey = this.$useQueryLocal(queryOptionsTabCurrentKey);
    } else {
      this.tabCurrentKey = this.$useQueryMem(queryOptionsTabCurrentKey);
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
    const [index] = this.findTab(tab.key);
    if (index === -1) {
      const tabNew = { ...tab, updatedAt: Date.now() };
      if (this.tabCurrentIndex === -1) {
        this.tabs = [...this.tabs, tabNew];
      } else {
        const tabsNew = this.tabs.slice();
        tabsNew.splice(this.tabCurrentIndex + 1, 0, tabNew);
        this.tabs = tabsNew;
      }
    } else {
      this.updateTab(tab);
    }
    // current
    this.tabCurrentKey = tab.key;
  }

  async deleteTab(tab: RouterTab) {
    // tabs
    const [index] = this.findTab(tab.key);
    if (index === -1) return;
    // current
    if (index === this.tabCurrentIndex) {
      // prev/next
      const tabCurrentIndex = index - 1 > -1 ? index - 1 : index + 1 < this.tabs.length ? index + 1 : -1;
      if (tabCurrentIndex > -1) {
        await this.activeTab(this.tabs[tabCurrentIndex]);
      }
    }
    // tabs
    const tabsNew = this.tabs.slice();
    tabsNew.splice(index, 1);
    this.tabs = tabsNew;
  }

  updateTab(tab: RouterTab) {
    const [index, tabOld] = this.findTab(tab.key);
    if (index === -1) return;
    const tabNew = { ...tabOld, ...tab, updatedAt: Date.now() };
    const tabsNew = this.tabs.slice();
    tabsNew.splice(index, 1, tabNew);
    this.tabs = tabsNew;
  }

  async activeTab(tab: RouterTab) {
    this.updateTab(tab);
    this.tabCurrentKey = tab.key;
    await this.$router.push(tab.fullPath);
  }

  findTab(key?: string): [number, RouterTab | undefined] {
    if (!key) return [-1, undefined];
    const index = this.tabs.findIndex(item => item.key === key);
    if (index === -1) return [index, undefined];
    return [index, this.tabs[index]];
  }

  _prepareTabsOptions(options?: ModelTabsOptions) {
    if (!options) options = {};
    options.scene = options.scene ?? '';
    options.max = options.max ?? -1;
    options.persister = !!options.persister;
    return options;
  }
}
