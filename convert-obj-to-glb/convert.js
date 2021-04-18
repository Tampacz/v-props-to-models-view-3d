const obj2gltf = require('./obj2gltf/index');
const path = require('path')
const fs = require('fs');

// cfg
const SKIP_EXISTS_OUTPUT_FILES = true;
const outputFileExt = 'glb'; // "glb" | "gltf"
const directoryPathWithObjFiles = path.join(__dirname, '../odr');
const directoryPathWithGlbFiles = path.join(__dirname, '../' + outputFileExt);
const convertOptions = {
    binary : true
};

// dump
let dumpJsonData = [];
let dumpSqlData = '';
const fullPathToDumpJson = path.join(__dirname, '../' + 'Dump.json');
const fullPathToDumpSql = path.join(__dirname, '../' + 'Dump.sql');

(async () => {
    // dump
    fs.writeFileSync(fullPathToDumpJson, '[]');
    fs.writeFileSync(fullPathToDumpSql, '');
    dumpJsonData = JSON.parse(fs.readFileSync(fullPathToDumpJson));
    dumpSqlData = fs.readFileSync(fullPathToDumpSql);

    // paths
    const dir = fs.readdirSync(directoryPathWithObjFiles);
    const files = dir.filter(((elm) => elm.match(/.*\.obj/ig)));
    const existsOutputFilesMap = fs.readdirSync(directoryPathWithGlbFiles).map((x) => x.replace('.' + outputFileExt, ''));

    // big loop
    for(const file of files) {
        if(!file.includes('.obj'))
            continue;

        if(SKIP_EXISTS_OUTPUT_FILES) {
            if(existsOutputFilesMap.indexOf(file.replace('.glb', '')) != -1)
                continue;
        }

        const objPath = directoryPathWithObjFiles + '/' + file;
        const glbFile = await obj2gltf(objPath, convertOptions);
        const glbFileName = file.replace('obj', outputFileExt);
        const glbPath = directoryPathWithGlbFiles + '/' + glbFileName;

        fs.writeFileSync(glbPath, glbFile);

        dumpJsonData.push({
            name: glbFileName.replace('.' + outputFileExt, '')
        });

        dumpSqlData += `INSERT INTO \`objectsLists\` (\`name\`, \`hash\`, \`selectedCount\`) VALUES ('${glbFileName.replace('.' + outputFileExt, '')}','${joaat(glbFileName.replace('.' + outputFileExt, ''))}','0');\n`
    }

    // dump
    fs.writeFileSync(fullPathToDumpJson, JSON.stringify(dumpJsonData, null, 4));
    fs.writeFileSync(fullPathToDumpSql, dumpSqlData);
})();




function joaat(s) {
    const k = s.toLowerCase();
    let h, i;

    for (h = i = 0; i < k.length; i++) {
        h += k.charCodeAt(i);
        h += (h << 10);
        h ^= (h >>> 6);
    }

    h += (h << 3);
    h ^= (h >>> 11);
    h += (h << 15);

    return (h >>> 0);
}