// Shim for require in ESM context
import { createRequire } from 'node:module';
globalThis.require = createRequire(import.meta.url);
