#!/usr/bin/env node
/**
 * Bundle script for MCPB package.
 * Uses esbuild to bundle all dependencies into a single file.
 */

import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.join(import.meta.dirname, '..', 'dist');

// Bundle the main entry point with all dependencies
await esbuild.build({
  entryPoints: [path.join(distDir, 'index.js')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: path.join(distDir, 'index.bundle.mjs'),
  // Keep optional deps external
  external: ['dotenv'],
  // Inject require shim for CommonJS compatibility
  inject: [path.join(import.meta.dirname, 'require-shim.js')],
  // Minify for smaller bundle
  minify: false,
  // Generate source map for debugging
  sourcemap: false
});

// Replace index.js with bundled version (keep as .mjs for ESM)
fs.unlinkSync(path.join(distDir, 'index.js'));
fs.renameSync(
  path.join(distDir, 'index.bundle.mjs'),
  path.join(distDir, 'index.mjs')
);

// Create a simple .js wrapper that imports the .mjs file
const wrapper = `#!/usr/bin/env node
import('./index.mjs');
`;
fs.writeFileSync(path.join(distDir, 'index.js'), wrapper);

// Keep package.json type:module for the wrapper

// Clean up files that are now bundled (keep UI files)
const filesToRemove = [
  'server.js',
  'bexio-client.js',
  'logger.js',
  'ui-resources.js',
  'vite.config.js'
];

const dirsToRemove = [
  'shared',
  'tools',
  'transports',
  'types'
];

for (const file of filesToRemove) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

for (const dir of dirsToRemove) {
  const dirPath = path.join(distDir, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true });
  }
}

console.log('Bundled for MCPB (dependencies included in index.js)');
