// Vercel serverless entry for the AdVerse Agency app.
//
// Forwards every request to the same Express app that server.ts runs locally
// and on AI Studio, so /api/rpc keeps the exact same request/response
// contract ({"method":...,"args":[...]} -> {"ok":true,"result":{...}}), as do
// the other /api/* routes (health, download-zip, download-apps-script).
//
// server.ts detects VERCEL=1 (set automatically by Vercel in the function
// runtime) and skips its listener, background timers and disk persistence;
// state is hydrated from the live sheet on first use (see ensureVercelReady
// in server.ts). The sheet ID + webhook come from .sheet_config.json, which
// ships with the repo — no environment variables are needed.
//
// NOTE: `vite` is never imported here. server.ts only imports it inside
// startServer()'s dev branch, which never runs on Vercel.
//
// The import uses the explicit `.js` extension: package.json is
// `"type": "module"`, so Node's ESM loader requires it — an extensionless
// `import '../server'` compiles to `/var/task/server` and fails at runtime
// with ERR_MODULE_NOT_FOUND (seen on the first Vercel deploy, 2026-11-08).
// TypeScript/tsx resolve `.js` back to the `.ts` source.
import app from '../server.js';

export default function handler(req: any, res: any): void {
  (app as any)(req, res);
}
