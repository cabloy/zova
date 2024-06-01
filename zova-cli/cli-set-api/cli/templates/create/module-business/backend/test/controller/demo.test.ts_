const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe('[your demo tests start from here]', () => {
  it('[demo]', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
  });
});
