"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalConsole = void 0;
class LocalConsole {
    constructor(cli) {
        Object.defineProperty(this, "cli", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cli = cli;
    }
    get options() {
        return this.cli.options;
    }
    get context() {
        return this.cli.options.context;
    }
    async log(data, options = {}) {
        if (!data)
            return;
        // data
        if (typeof data !== 'object') {
            data = { text: String(data) };
        }
        let { /* progressNo,*/ total, progress, text } = data;
        // logPrefix
        const logPrefix = options.logPrefix;
        if (logPrefix) {
            text = this._adjustText(logPrefix, text);
        }
        // fallback
        if (!this.cli.terminal) {
            if (total !== undefined && progress !== undefined) {
                const progressValid = progress >= 0;
                const progressText = `(${progressValid ? progress + 1 : '-'}/${total})`;
                if (progressValid) {
                    text = this._adjustText(`${progressText}=> `, text);
                }
            }
            return console.log(text);
        }
    }
    _adjustText(prefix, text) {
        return String(text)
            .split('\n')
            .map(item => (item ? prefix + item : item))
            .join('\n');
    }
}
exports.LocalConsole = LocalConsole;
//# sourceMappingURL=local.console.js.map