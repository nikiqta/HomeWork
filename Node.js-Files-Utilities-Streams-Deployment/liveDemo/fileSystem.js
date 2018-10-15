const fs = require('fs');

function promisfy(func) {
    return (...params) => {
        return new Promise((resolve, reject) => {
            func(...params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

const readdir = promisfy(fs.readdir);
const readFile = promisfy(fs.readFile);
const mkdir = promisfy(fs.mkdir);
const writeFile = promisfy(fs.writeFile);

/*
function readdir(path) {
    return new Promise((resolve, reject) => {
          fs.readdir(path, (err, data) => {
              if (err) {
                  reject(err);
              }
              resolve(data);
          });
    });
}
 */

async function copySettings() {
    try {
        let files = await readdir('./');
        let lastFile = files.slice(-1);
        let fileAsString = await readFile(lastFile.toString(), 'utf8');
        let settings = JSON.parse(fileAsString);
        settings.description = "Demo project";
        await mkdir('./copy');
        await writeFile('./copy/package.json', JSON.stringify(settings));
        console.log('Done');
    } catch (err) {
        console.log(err);
    }

}


copySettings();