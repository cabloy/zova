"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = getRegistry;
const config_1 = __importDefault(require("@npmcli/config"));
const definitions_1 = require("@npmcli/config/lib/definitions");
let __registry;
async function getRegistry() {
    if (!__registry) {
        const npmConfig = new config_1.default({ npmPath: '', definitions: definitions_1.definitions, shorthands: definitions_1.shorthands, flatten: definitions_1.flatten });
        await npmConfig.load();
        __registry = npmConfig.get('registry') || 'https://registry.npmjs.org/';
        if (__registry.charAt(__registry.length - 1) !== '/') {
            __registry = __registry + '/';
        }
    }
    return __registry;
}
//# sourceMappingURL=registry.js.map