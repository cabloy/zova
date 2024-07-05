import { Model, useComputed } from 'zova';
import { BeanModelBase, UseQueryOptions } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

export interface RouterTab {
  key: string;
  name?: string;
  keepalive?: boolean;
  affix?: boolean;
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
  keepaliveExclude: string[];

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
    this.keepaliveExclude = useComputed(() => {
      return this._getKeepaliveExclude();
    });
  }

  addTab(tab: RouterTab) {
    this._addTab(tab);
    // current
    this.tabCurrentKey = tab.key;
  }

  _addTab(tab: RouterTab) {
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
  }

  async addAffixTabs(affixTabs?: RouterTab[]) {
    if (!affixTabs) {
      // donothing
      return;
    }
    // record old affixTabs
    const oldTabs: RouterTab[] = [];
    for (const tab of this.tabs) {
      if (tab.affix && affixTabs.findIndex(item => item.key === tab.key) === -1) {
        oldTabs.push(tab);
      }
    }
    // add new affixTabs
    for (const tab of affixTabs) {
      this._addTab(tab);
    }
    // delete old affixTabs
    for (const tab of oldTabs) {
      await this.deleteTab(tab);
    }
    // sort
    const tabsNew = this.tabs.slice();
    tabsNew.sort((a, b) => {
      return Number(!!b.affix) - Number(!!a.affix);
    });
    this.tabs = tabsNew;
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
    await this.$router.push(tab.key);
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

  _getKeepaliveExclude() {
    const exclude: string[] = [];
    for (const tab of this.tabs) {
      if (tab.keepalive === false && tab.name) {
        exclude.push(tab.name);
      }
    }
    return exclude;
  }
}
