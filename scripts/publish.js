#!/usr/bin/env node

// lerna publish from-git
// lerna publish from-package

import fs from 'node:fs';
import path from 'node:path';
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
  const from = argv.from;
  // loop
  const processHelper = new ProcessHelper(process.cwd());
  for (const project of projects) {
    console.log('----------: ', project);
    // cwd
    const cwd = `${process.cwd()}/${project}`;
    // cmd
    const cmd = fs.existsSync(path.join(cwd, 'lerna.json')) ? 'lerna' : 'pnpm';
    // args
    const args = ['publish'];
    if (cmd === 'lerna' && from) {
      args.push(`from-${from}`);
    }
    // spawn
    await processHelper.spawnCmd({
      cmd,
      args,
      options: { cwd },
    });
  }
}
