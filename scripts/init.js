#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { config } from './config.js';

(async function () {
  await main();
})();

async function main() {
  const cwdDir = cwd();
  for (const uiProject of config.uiProjects) {
    await fs.copyFile(
      path.join(cwdDir, uiProject, 'package.original.json'),
      path.join(cwdDir, uiProject, 'package.json'),
    );
  }
}
