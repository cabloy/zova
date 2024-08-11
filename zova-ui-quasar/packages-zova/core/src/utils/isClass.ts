export function isClass(fn) {
  // just check if is function
  return typeof fn === 'function';
}

// function fnBody(fn) {
//   return toString
//     .call(fn)
//     .replace(/^[^{]*{\s*/, '')
//     .replace(/\s*}[^}]*$/, '');
// }

// export function isClass(fn) {
//   return (
//     typeof fn === 'function' && (/^class(?:\s|{)/.test(toString.call(fn)) || /^.*classCallCheck\(/.test(fnBody(fn))) // babel.js
//   );
// }
