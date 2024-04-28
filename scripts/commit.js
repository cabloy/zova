#!/usr/bin/env node

import { ProcessHelper } from '@cabloy/process-helper';
import parseArgs from 'minimist';
import { config } from './config.js';

(async function () {
  await main();
})();

async function main() {
  // argv
  const argv = parseArgs(process.argv.slice(2));
  console.log(argv);
  // message
  const message = argv._[0];
  // project
  const projects = config.projects;
  // loop
  const processHelper = new ProcessHelper(process.cwd());
  for (const project of projects) {
    console.log('----------: ', project);
    const cwd = `${process.cwd()}/${project}`;
    await processHelper.gitCommit(message, { cwd });
  }
  // main
  console.log('----------: main');
  await processHelper.gitCommit(message);
}
