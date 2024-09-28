function _parseLastWord(str?: string): string | undefined {
  if (!str) return str;
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str.charAt(i);
    if (ch >= 'A' && ch <= 'Z') return str.substring(i);
  }
  return str;
}

function _parseFirstWord(str?: string): string | undefined {
  if (!str) return str;
  for (let i = 1; i < str.length; i++) {
    const ch = str.charAt(i);
    if (ch >= 'A' && ch <= 'Z') return str.substring(0, i);
  }
  return str;
}

export function toLowerCaseFirstChar(str: string) {
  return str.charAt(0).toLowerCase() + str.substring(1);
}

export function parseLastWord(str?: string, toLowerCase?: boolean): string | undefined {
  const word = _parseLastWord(str);
  if (!word) return word;
  return toLowerCase ? toLowerCaseFirstChar(word) : word;
}

export function parseFirstWord(str?: string, toLowerCase?: boolean): string | undefined {
  const word = _parseFirstWord(str);
  if (!word) return word;
  return toLowerCase ? toLowerCaseFirstChar(word) : word;
}

export function skipPrefix(str?: string, prefix?: string, toLowerCase?: boolean): string | undefined {
  if (!str) return str;
  let word: string;
  if (!prefix) {
    word = str;
  } else {
    const prefix2 = prefix.replace(/\./gi, '');
    if (str.toLowerCase().startsWith(prefix2.toLowerCase())) {
      word = str.substring(prefix2.length);
    } else {
      word = str;
    }
  }
  return toLowerCase ? toLowerCaseFirstChar(word) : word;
}

export function skipLastWord(str?: string, lastWord?: string, toLowerCase?: boolean): string | undefined {
  if (!str) return str;
  if (!lastWord) lastWord = parseLastWord(str)!;
  let word;
  if (str.toLowerCase().endsWith(lastWord.toLowerCase())) {
    word = str.substring(0, str.length - lastWord.length);
  } else {
    word = str;
  }
  return toLowerCase ? toLowerCaseFirstChar(word) : word;
}

export function splitWords(str?: string, toLowerCase?: boolean, separator: string = ' '): string | undefined {
  if (!str) return str;
  // parts
  let parts: string[] = [];
  let pos = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str.charAt(i);
    if (ch >= 'A' && ch <= 'Z') {
      parts.unshift(str.substring(i, pos));
      pos = i;
    }
  }
  if (pos > 0) parts.unshift(str.substring(0, pos));
  // lowerCase
  if (toLowerCase) {
    parts = parts.map(item => toLowerCaseFirstChar(item));
  }
  // join
  return parts.join(separator);
}
