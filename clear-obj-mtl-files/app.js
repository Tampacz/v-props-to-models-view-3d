const fs = require('fs');
const path = require('path');

const odrDirPath = path.join(__dirname, '../odr');
const files = fs.readdirSync(odrDirPath);

for(const file of files) {
    const name = file.split('.')[0];
    const ext = file.split('.')[1];

    if(ext == 'obj' || ext == 'mtl' || ext == 'ydr') {
        const filePath = path.join(__dirname, '../odr', file);
        fs.rmSync(filePath, { recursive: true, force: true });
    }
}