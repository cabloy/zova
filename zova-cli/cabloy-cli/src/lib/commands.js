"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandsMeta = getCommandsMeta;
exports.findCommand = findCommand;
exports.collectCommands = collectCommands;
const config_js_1 = require("../config.js");
let __commandsMeta;
async function getCommandsMeta() {
    await collectCommands();
    return __commandsMeta;
}
function findCommand(cliFullName) {
    return __commandsMeta.map[cliFullName];
}
async function collectCommands() {
    await _collectCommands();
}
async function _collectCommands() {
    if (__commandsMeta)
        return;
    const _commandsMap = {};
    const _commandsAll = {};
    const sets = config_js_1.commandsConfig.sets[process.env.CabloyCliBrandName];
    for (const setName in sets) {
        const setModuleName = sets[setName];
        const setModule = await import(setModuleName);
        const commands = setModule.commands;
        if (!commands)
            continue;
        const _commandsSet = (_commandsAll[setName] = {});
        for (const groupName in commands) {
            const group = commands[groupName];
            const _commandsGroup = (_commandsSet[groupName] = {});
            for (const key in group) {
                const command = group[key];
                const fullKey = `${setName}:${groupName}:${key}`;
                // command BeanClass
                const BeanClass = setModule.beans[command.bean];
                // ok
                _commandsMap[fullKey] = _commandsGroup[key] = { command, BeanClass };
            }
        }
    }
    // ok
    __commandsMeta = {
        map: _commandsMap,
        all: _commandsAll,
    };
}
//# sourceMappingURL=commands.js.map