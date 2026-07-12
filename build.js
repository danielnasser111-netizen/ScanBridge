const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const output = path.join(root, 'dist');
const publicExtensions = new Set(['.html', '.js', '.css', '.png', '.svg']);
const privateFiles = new Set(['server.js', 'build.js']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const name of fs.readdirSync(root)) {
  const source = path.join(root, name);
  if (fs.statSync(source).isFile() && !privateFiles.has(name) && publicExtensions.has(path.extname(name))) {
    fs.copyFileSync(source, path.join(output, name));
  }
}
console.log('Built public ScanBridge files into dist.');
