const index = require('./index.js');
const colors = require('colors/safe');
const prompt = require("prompt-sync")({ sigint: true });

const mdLinks = (route, options) => {

    return new Promise((resolve) => {

        const linksArray = [];
        //Se verifica la existencia de la ruta
        index.verifyExistance(route)

        const mdFiles = [];
        //Se aplica la función que reconocer si es un archivo o un directorio
        const typeOfArchive = index.kindOfRoute(route);

        //En caso de ser archivo, se verifica su extensión
        if (typeOfArchive.isFile()) {
            console.log(colors.yellow('El archivo existe 😃, verificaré su extensión.'))
            index.checkExtension(route)
            index.readFile(route)
            .then((links) => {
                promiseArray = links.map((url) => index.linkValidation(url))
                //console.log(promiseArray)
                return Promise.all(promiseArray)
                })
                .then((res) => {
                    if (options.stats) {
                        index.linkCounter(res);
                    }
                    if (options.validate) {
                        index.statusData(res);
                    } else if (options.stats && options.validate) {
                        index.linkCounter(res);
                        index.statusData(res);
                    }
                    resolve(res)

                }).then((res) => console.log(colors.bgMagenta(' ✨ ¡Espero haber sido de ayuda! Adiós ✨ ')))
        }
        if (typeOfArchive.isDirectory()) {
            index.directoryFiles(route).forEach(file => {
                let mdExt = index.filterMdFiles(file)
                if (mdExt == '.md') {
                    mdFiles.push(file)
                }
            });
            if (mdFiles == '') {
                console.log(colors.red('Este directorio no contiene archivos md, no tengo nada que hacer aquí 😔'))
                console.log(colors.bgMagenta(` Adiós 👋 `))
                exit()
            } else {
                console.log(colors.yellow('😃 El directorio existe y contiene los siguientes archivos md:'))
                console.log(mdFiles)
                const fileName = prompt(colors.blue('Por favor, ingrese el nombre del archivo que desea analizar: '));
                console.log(colors.yellow('Estoy analizando el archivo, esto puede demorar un poco ⌛ \n'));
                index.readFile(fileName)
                .then((links) => {
                    promiseArray = links.map((url) => index.linkValidation(url))
                    //console.log(promiseArray)
                    return Promise.all(promiseArray)
                    })
                    .then((res) => {
                        if (options.stats) {
                            index.linkCounter(res);
                        }
                        if (options.validate) {
                            index.statusData(res);
                        } 
                        if (options.stats && options.validate) {
                            index.linkCounter(res);
                            index.statusData(res);
                        } 
                        resolve(res)
                        

                    }).then((res) => console.log(colors.bgMagenta('\n ✨ ¡Espero haber sido de ayuda! Adiós ✨ \n')))
            }
        }
    })
};


module.exports.mdLinks = mdLinks;