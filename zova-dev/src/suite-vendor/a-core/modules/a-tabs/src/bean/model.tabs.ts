import { Model, useComputed } from 'zova';
import { BeanModelBase, UseQueryOptions } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';
import { watch } from 'vue';

export interface RouterTabInfo {
  title?: string;
  icon?: string;
}

export interface RouterTab {
  key: string;
  name?: string;
  keepAlive?: boolean;
  affix?: boolean;
  updatedAt?: number;
  info?: RouterTabInfo;
}

export interface ModelTabsOptions {
  scene?: string;
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouterTab[] | undefined;
  getTabInfo: (tab: RouterTab) => Promise<RouterTabInfo | undefined>;
}

@Model()
export class ModelTabs extends BeanModelBase<ScopeModule> {
  tabsOptions: ModelTabsOptions;
  tabs: RouterTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouterTab;
  keepAliveInclude: string[];

  protected async __init__(options: ModelTabsOptions) {
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
    this.keepAliveInclude = useComputed(() => {
      return this._getKeepAliveInclude();
    });
    // watch
    watch(
      this.tabsOptions.getAffixTabs,
      value => {
        this.addAffixTabs(value);
      },
      { immediate: true },
    );
  }

  async addTab(tab: RouterTab): Promise<boolean> {
    const res = await this._addTab(tab);
    if (res) {
      // current
      this.tabCurrentKey = tab.key;
    }
    return res;
  }

  async _addTab(tab: RouterTab): Promise<boolean> {
    // tabs
    const [index] = this.findTab(tab.key);
    if (index === -1) {
      const tabInfo = await this.tabsOptions.getTabInfo(tab);
      if (!tabInfo) return false;
      const tabNew = { ...tab, updatedAt: Date.now(), info: tabInfo };
      if (this.tabCurrentIndex === -1) {
        this.tabs = [...this.tabs, tabNew];
      } else {
        const tabsNew = this.tabs.slice();
        tabsNew.splice(this.tabCurrentIndex + 1, 0, tabNew);
        this.tabs = tabsNew;
      }
      this.pruneTabs();
    } else {
      this.updateTab(tab);
    }
    return true;
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
      await this._addTab(tab);
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

  async pruneTabs() {
    if (!this.tabsOptions.max || this.tabsOptions.max <= 0) return;
    while (this.tabs.length > this.tabsOptions.max) {
      let key: string | undefined;
      let updatedAt = Date.now();
      for (const tab of this.tabs) {
        if (!tab.affix && tab.updatedAt! < updatedAt) {
          key = tab.key;
          updatedAt = tab.updatedAt!;
        }
      }
      if (!key) break;
      await this.deleteTab({ key });
    }
  }

  private _prepareTabsOptions(options: ModelTabsOptions) {
    options.scene = options.scene ?? '';
    options.max = options.max ?? -1;
    options.persister = !!options.persister;
    return options;
  }

  private _getKeepAliveInclude() {
    const include: string[] = [];
    for (const tab of this.tabs) {
      if (tab.keepAlive !== false && tab.name) {
        include.push(tab.name);
      }
    }
    return include;
  }
}
