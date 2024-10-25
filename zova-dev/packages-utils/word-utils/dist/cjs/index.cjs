'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowerCaseFirstChar = toLowerCaseFirstChar;
exports.toUpperCaseFirstChar = toUpperCaseFirstChar;
exports.parseLastWord = parseLastWord;
exports.parseFirstWord = parseFirstWord;
exports.skipPrefix = skipPrefix;
exports.skipLastWord = skipLastWord;
exports.splitWords = splitWords;
function _parseLastWord(str) {
    if (!str)
        return str;
    for (let i = str.length - 1; i >= 0; i--) {
        const ch = str.charAt(i);
        if (ch >= 'A' && ch <= 'Z')
            return str.substring(i);
    }
    return str;
}
function _parseFirstWord(str) {
    if (!str)
        return str;
    for (let i = 1; i < str.length; i++) {
        const ch = str.charAt(i);
        if (ch >= 'A' && ch <= 'Z')
            return str.substring(0, i);
    }
    return str;
}
function toLowerCaseFirstChar(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}
function toUpperCaseFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}
function parseLastWord(str, toLowerCase) {
    const word = _parseLastWord(str);
    if (!word)
        return word;
    return toLowerCase ? toLowerCaseFirstChar(word) : word;
}
function parseFirstWord(str, toLowerCase) {
    const word = _parseFirstWord(str);
    if (!word)
        return word;
    return toLowerCase ? toLowerCaseFirstChar(word) : word;
}
function skipPrefix(str, prefix, toLowerCase) {
    if (!str)
        return str;
    let word;
    if (!prefix) {
        word = str;
    }
    else {
        const prefix2 = prefix.replace(/\./gi, '');
        if (str.toLowerCase().startsWith(prefix2.toLowerCase())) {
            word = str.substring(prefix2.length);
        }
        else {
            word = str;
        }
    }
    return toLowerCase ? toLowerCaseFirstChar(word) : word;
}
function skipLastWord(str, lastWord, toLowerCase) {
    if (!str)
        return str;
    if (!lastWord)
        lastWord = parseLastWord(str);
    let word;
    if (str.toLowerCase().endsWith(lastWord.toLowerCase())) {
        word = str.substring(0, str.length - lastWord.length);
    }
    else {
        word = str;
    }
    return toLowerCase ? toLowerCaseFirstChar(word) : word;
}
function splitWords(str, toLowerCase, separator = ' ') {
    if (!str)
        return str;
    // parts
    let parts = [];
    let pos = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const ch = str.charAt(i);
        if (ch >= 'A' && ch <= 'Z') {
            parts.unshift(str.substring(i, pos));
            pos = i;
        }
    }
    if (pos > 0)
        parts.unshift(str.substring(0, pos));
    // lowerCase
    if (toLowerCase) {
        parts = parts.map(item => toLowerCaseFirstChar(item));
    }
    // join
    return parts.join(separator);
}
