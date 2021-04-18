const path = require('path')
const fs = require('fs');

const VALID_IMAGE_EXTS = [".png", ".tga", ".dds", ".jpg", ".jpeg"];
const VALID_PATH_REGEX = new RegExp("^[\\\w\-. ]+$");
const VERSION = "0.13"
const OBJ_FIRST_LINE = `# V ${VERSION}`;

const parseOdr = (filePath) => {
    const fullPath = path.join(__dirname, filePath);
    const split = fullPath.split('.')

console.log(split)

    const name = split[0];
    const ext = split[1];
	const objPath = "../obj/"+name+".obj";
	const mtlPath = "../obj/"+name+".mtl";

    if(ext != '.odr')
        return;

    console.log(`Converting ${filePath} ...`);

    const odrData = fs.readFileSync(fullPath);
    let shaderDatas = odrData.replace("Shaders\s+{([\s\S]+?)^\t}", '^');
    console.log(shaderDatas)
    shaderDatas = shaderDatas[0].replace("(.+?\.sps)[\s\S]+?{([\s\S]+?)}", '^');
    const shaders = [];

    // for(const d of shaderDatas) {

    // }

    console.log(shaderDatas);
}

parseOdr('../obj/souplongwall019.obj')