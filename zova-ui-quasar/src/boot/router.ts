export default function () {
  return {
    install() {},
    resolve(url) {
      return { fullPath: url };
    },
    async push(_url) {},
    async isReady() {},
    currentRoute: {
      value: {
        matched: [{ components: [{}] }],
      },
    },
  };
}
