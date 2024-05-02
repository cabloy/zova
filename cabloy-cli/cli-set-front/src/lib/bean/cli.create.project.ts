import { BeanCliBase, CmdOptions } from '@cabloy/cli';
import os from 'node:os';
import fs from 'fs';
import path from 'path';
import urllib from 'urllib';
import { rimraf } from 'rimraf';
import compressing from 'compressing';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
    template: string;
  }
}

export class CliCreateModule extends BeanCliBase {
  httpClient: typeof urllib;
  registryUrl: string;

  constructor(options: CmdOptions) {
    super(options);
    this.httpClient = urllib;
    this.registryUrl = 'https://registry.npmjs.org';
  }

  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // project name
    const projectName = argv.name;
    // target dir
    let targetDir;
    targetDir = path.join(argv.projectPath, projectName);
    if (!argv.force && fs.existsSync(targetDir)) {
      throw new Error(`project exists: ${projectName}`);
    }
    // template
    const template = argv.template;
    const packageName = `@cabloy/front-${template}`;
    // download boilerplate
    const templateDir = await this.downloadBoilerplate(packageName);
    fs.copyFileSync(templateDir, targetDir);
    // done
    await this.printUsage(targetDir);
  }

  async printUsage(targetDir: string) {
    await this.console.log(`usage:
      - cd ${targetDir}
      - pnpm install
    `);
  }

  async downloadBoilerplate(packageName: string) {
    const result = await this.getPackageInfo(packageName, false);
    const tgzUrl = result.dist.tarball;

    await this.console.log(`downloading ${tgzUrl}`);

    const saveDir = path.join(os.tmpdir(), 'cabloy-front-project-boilerplate');
    await rimraf(saveDir);

    const response = await this.curl(tgzUrl, { streaming: true, followRedirect: true });
    await compressing.tgz.uncompress(response.res as any, saveDir);

    await this.console.log(`extract to ${saveDir}`);
    return path.join(saveDir, '/package');
  }

  async getPackageInfo(packageName: string, withFallback: boolean) {
    await this.console.log(`fetching npm info of ${packageName}`);
    try {
      const result = await this.curl(`${this.registryUrl}/${packageName}/latest`, {
        dataType: 'json',
        followRedirect: true,
        maxRedirects: 5,
      });
      if (result.status !== 200) {
        const message = `npm info ${packageName} got error: ${result.status}, ${result.data.reason}`;
        throw new Error(message);
      }
      return result.data;
    } catch (err) {
      if (withFallback) {
        await this.console.log(`use fallback from ${packageName}`);
        return require(`${packageName}/package.json`);
      }
      throw err;
    }
  }

  async curl(url: string, options) {
    options = options || {};
    if (!options.timeout) {
      options.timeout = 30000;
    }
    return await this.httpClient.request(url, options);
  }
}
