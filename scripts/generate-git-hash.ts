const fs = require('fs');
const path = require('path');

require('child_process').exec('git rev-parse HEAD', (_: any, hash: string) => {
  fs.writeFileSync(path.join(process.env.PWD, '.git-hash.json'), `"${hash.trim()}"`);
});
