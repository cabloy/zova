#!/usr/bin/env node

// lerna publish from-git
// lerna publish from-package

import { ProcessHelper } from '@cabloy/process-helper';
import parseArgs from 'minimist';
import { config } from './config.js';

(async function () {
  await main();
})();

async function main() {
  // argv
  const argv = parseArgs(process.argv.slice(2));
  // project
  const project = argv._[0];
  const projects = project ? [project] : config.projects;
  // from
  const from = argv.mode;
  // loop
  const processHelper = new ProcessHelper(process.cwd());
  for (const project of projects) {
    console.log('----------: ', project);
    const args = ['publish'];
    if (from) {
      args.push(`from-${from}`);
    }
    const cwd = `${process.cwd()}/${project}`;
    await processHelper.spawnCmd({
      cmd: 'lerna',
      args,
      options: { cwd },
    });
  }
}
