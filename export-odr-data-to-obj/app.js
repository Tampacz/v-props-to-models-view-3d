const fs = require('fs')
const path = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const relPath = path.join(__dirname, '../odr');
const dirsr = getDirectories(relPath);

for(const dir of dirsr) {
    const files = fs.readdirSync(path.join(relPath, dir));

    for(const file of files) {
        const src = path.join(relPath, dir + '/' + file);
        const dest = path.join(__dirname, '../obj' + '/' + file)
        fs.copyFileSync(src, dest);
    }
}

// for(const dir of dirs) {
//     console.log(dir)
//     // const files = fs.readFileSync(dir);
//     // console.log(files)
//     // const files = getFiles(dir)
//     // for(const file of files) {
//     //     console.log(file)
//     // }
// }