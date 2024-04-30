import { Bean, BeanBase } from '@cabloy/core';

const fileVersionUpdates: number[] = [];
const fileVersionInits: number[] = [];

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (fileVersionUpdates.includes(options.version)) {
      const { VersionUpdate } = await import(`./version.manager/update/update${options.version}.js`);
      const versionUpdate = this.ctx.bean._newBean(VersionUpdate);
      await versionUpdate.run(options);
    }
  }

  async init(options) {
    if (fileVersionInits.includes(options.version)) {
      const { VersionInit } = await import(`./version.manager/init/init${options.version}.js`);
      const versionInit = this.ctx.bean._newBean(VersionInit);
      await versionInit.run(options);
    }
  }

  async test() {
    const { VersionTest } = await import('./version.manager/test/test.js');
    const versionTest = this.ctx.bean._newBean(VersionTest);
    await versionTest.run();
  }
}
