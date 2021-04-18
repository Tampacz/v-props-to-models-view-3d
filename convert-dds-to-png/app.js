const fs = require('fs')
const path = require('path')
const {exec} = require('child_process')

const isDirectory = source => fs.lstatSync(source)?.isDirectory()
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getOdrFiles = () => {
    const files = [];
    
    for(const file of fs.readdirSync(path.join(__dirname, '../odr'))) {
        if(!file.includes('.odr'))
            continue;

        files.push(file);
    }

    return files;
}

// ....
let count = 0;
const odrDirPath = path.join(__dirname, '../odr');
const dirsr = getDirectories(odrDirPath); // ex: ["/odr/prop_super1/", "/odr/prop_super2/", "/odr/prop_super3/"]

for(const dir of dirsr) { // ex. "/odr/prop_dummy_car/"
    const dirPath = path.join(odrDirPath, dir);
    const files = fs.readdirSync(dirPath); // ex. "/odr/prop_dummy_car/{file like .dds etc}"

    const hasPng = files.findIndex((x) => x.includes('.png')) != -1;
    const hasDds = files.findIndex((x) => x.includes('.dds')) != -1;
    const isBadFile = dir.includes('mesh') || dir.includes('(0)') || dir.includes('(1)') || dir.includes('(2)') || dir.includes('(3)') || dir.includes('(4)') || dir.includes('(5)') || dir.includes('(6)');

    if(!hasPng) {
        if(!hasDds || isBadFile) {
            const deleteDirPath = path.join(__dirname, '../odr', dir); // directory config
            const deleteFilePath = path.join(__dirname, '../odr', dir + '.odr'); // file .odr
    
            fs.rmdirSync(deleteDirPath, {recursive: true , force: true});
            fs.rmSync(deleteFilePath, { recursive: true, force: true });
    
            console.log(`Delete: ${deleteDirPath}`);
            console.log(`Delete: ${deleteFilePath}`);
        } else {
            for(const f of files) {
                exec(`magick convert ${f} ${f.replace('dds', 'png')}`, { // ex. "magick convert file.dds file.png"
                    cwd: dirPath
                });
            }
        }
    }

    count++;
    console.log(`${count}/${dirsr.length}`)
}


// for(const file of getOdrFiles()) {
//     const name = file.replace('.odr', '');
//     const exists = fs.existsSync(path.join(__dirname, '../odr', name))

//     if(exists)
//         continue;

//     const deletaPath = path.join(__dirname, '../odr', file); // ex. "/odr/weak_file.odr"
//     fs.rmSync(deletaPath, { recursive: true, force: true });

//     console.log(name, exists)
// }