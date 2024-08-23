import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { ssrMiddleware } from 'quasar/wrappers';

// This middleware should execute as first one
// since it prepare the process.env variables

export default ssrMiddleware(({ app: _app, resolve: _resolve, render: _render, serve: _serve }) => {
  if (process.env.PROD) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const envContent = readFileSync(path.join(__dirname, './.env.json'));
    const env = JSON.parse(envContent.toString());
    for (const key of Object.keys(env)) {
      if (process.env[key] === undefined && env[key] !== false) {
        process.env[key] = env[key];
      }
    }
  }
});
