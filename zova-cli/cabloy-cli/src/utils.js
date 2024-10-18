"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUpdates = checkForUpdates;
exports.getPackageInfo = getPackageInfo;
const urllib_1 = __importDefault(require("urllib"));
const semver_1 = __importDefault(require("semver"));
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const registry_js_1 = require("./registry.js");
const boxenOptions = { padding: 1, margin: 1, align: 'center', borderColor: 'yellow', borderStyle: 'round' };
async function checkForUpdates(packageName) {
    try {
        // version old
        const pkg = require(`${packageName}/package.json`);
        const versionOld = pkg.version;
        // version new
        const info = await getPackageInfo(packageName);
        const versionNew = info.version;
        // check
        const lt = semver_1.default.lt(versionOld, versionNew);
        if (!lt)
            return;
        // log
        let message = `[${chalk_1.default.keyword('cyan')(packageName)}] new version available: ${chalk_1.default.keyword('yellow')(versionOld)} → ${chalk_1.default.keyword('orange')(versionNew)}`;
        message += `\nRun ${chalk_1.default.keyword('orange')(`> pnpm add -g ${packageName} <`)} to update!`;
        console.log('\n' + (0, boxen_1.default)(message, boxenOptions));
    }
    catch (_err) {
        // donothing
    }
}
async function getPackageInfo(packageName) {
    const registry = await (0, registry_js_1.getRegistry)();
    const result = await urllib_1.default.request(`${registry}${packageName}/latest`, {
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
//# sourceMappingURL=utils.js.map