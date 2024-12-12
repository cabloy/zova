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
function combineWordsDeduplicate(str1, str2) {
    if (!str1 || !str2)
        return str1 + str2;
    const lastWord = parseLastWord(str1);
    if (!lastWord || !str2.startsWith(lastWord))
        return str1 + str2;
    const leftWord = str1.substring(0, str1.length - lastWord.length);
    return leftWord + str2;
}
function stringToCapitalize(str, separator) {
    if (typeof str === 'string')
        str = str.split(separator ?? ',');
    return str.map(name => toUpperCaseFirstChar(name)).join('');
}
function replaceTemplate(content, scope) {
    if (!content)
        return content;
    if (!scope)
        return content;
    return content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
        if (skip) {
            return block.substring(skip.length);
        }
        const value = getProperty(scope, key);
        return value !== undefined ? value : '';
    });
}
function getProperty(obj, name, sep) {
    return _getProperty(obj, name);
}
function _getProperty(obj, name, sep, forceObject) {
    if (!obj)
        return undefined;
    const names = name.split('.');
    // loop
    for (const name of names) {
        if (obj[name] === undefined || obj[name] === null) {
            {
                obj = obj[name];
                break;
            }
        }
        obj = obj[name];
    }
    return obj;
}

export { combineWordsDeduplicate, parseFirstWord, parseLastWord, replaceTemplate, skipLastWord, skipPrefix, splitWords, stringToCapitalize, toLowerCaseFirstChar, toUpperCaseFirstChar };
