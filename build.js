const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const output = path.join(root, 'dist');
const publicExtensions = new Set(['.html', '.js', '.css', '.png', '.svg', '.txt']);
const privateFiles = new Set(['server.js', 'build.js']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const name of fs.readdirSync(root)) {
  const source = path.join(root, name);
  if (fs.statSync(source).isFile() && !privateFiles.has(name) && publicExtensions.has(path.extname(name))) {
    fs.copyFileSync(source, path.join(output, name));
  }
}
const assetDirectory = path.join(root, 'assets');
if (fs.existsSync(assetDirectory)) fs.cpSync(assetDirectory, path.join(output, 'assets'), { recursive: true });
console.log('Built public ScanBridge files into dist.');
