#!/usr/bin/env node

import { ProcessHelper } from '@cabloy/process-helper';
import parseArgs from 'minimist';

const __AllProjects = [
  //
  'cabloy-cli',
];

(async function () {
  await main();
})();

async function main() {
  // argv
  const argv = parseArgs(process.argv.slice(2));
  // project
  const project = argv.args[0];
  const projects = project ? [project] : __AllProjects;
  // loop
  const processHelper = new ProcessHelper(process.cwd());
  for (const project of projects) {
    console.log('----------: ', project);
    const cwd = `${process.cwd()}/${project}`;
    await processHelper.spawnCmd({
      cmd: 'lerna',
      args: ['publish'],
      options: { cwd },
    });
  }
}
