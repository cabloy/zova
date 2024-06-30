import urllib from 'urllib';
import semver from 'semver';
import chalk from 'chalk';
import boxen from 'boxen';

const boxenOptions = { padding: 1, margin: 1, align: 'center', borderColor: 'yellow', borderStyle: 'round' };

export async function checkForUpdates(packageName: string) {
  // version old
  const pkg = require(`${packageName}/package.json`);
  const versionOld = pkg.version;
  // version new
  const info = await getPackageInfo(packageName);
  const versionNew = info.version;
  // check
  const lt = semver.lt(versionOld, versionNew);
  if (!lt) return;
  // log
  let message = `[${chalk.keyword('cyan')(packageName)}] new version available: ${chalk.keyword('yellow')(
    versionOld,
  )} → ${chalk.keyword('orange')(versionNew)}`;
  message += `\nRun ${chalk.keyword('orange')(`> pnpm add -g ${packageName} <`)} to update!`;

  console.log('\n' + boxen(message, boxenOptions as any));
}

export async function getPackageInfo(packageName: string) {
  const result = await urllib.request(`https://registry.npmjs.org/${packageName}/latest`, {
    dataType: 'json',
    followRedirect: true,
    maxRedirects: 5,
  });
  if (result.status !== 200) {
    const message = `npm info ${packageName} got error: ${result.status}, ${result.data.reason}`;
    throw new Error(message);
  }
  return result.data;
}
