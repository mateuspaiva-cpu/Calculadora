// Copia os arquivos do app para a pasta dist/.
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const f of ['index.html', 'manifest.webmanifest', 'icon.svg', 'sw.js']) {
  fs.copyFileSync(path.join(__dirname, f), path.join(out, f));
}
console.log('Build concluído em dist/');
