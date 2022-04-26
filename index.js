const colors = require('colors/safe');
const path = require('path');
const app = require('./app.js');
const prompt = require('prompt-sync')({ sigint: true });
// const { env } = require('process'); 

const mdLinks = (path, options) => {

    return new Promise((resolve) => {

        if (app.routeExist(path)) {

            path = app.pathAbsolute(path);

            if (app.archiDirectory(path)) {
                const archiDirectory = app.archiDirectory(path);

                if (archiDirectory.isFile(path)) {
                    // console.log('Es archivo', archiDirectory.isFile());
                    if (app.extension(path)) {
                        app.readFile(path)
                            .then((arrayLink) => {
                                // console.log('esto es ',path);
                                const promiseArray = arrayLink.map(element => app.validateLinks(element));
                                // console.log('Hola Link', promiseArray);
                                return Promise.all(promiseArray);
                            })
                            .then((element) => {
                                if (options.stats) {
                                    app.counterLink(element);
                                }

                                if (options.validate) {
                                    app.statusLink(element);
                                }

                                if (options.stats && options.validate) {
                                    app.counterLink(element);
                                    app.statusLink(element);
                                }
                                resolve(element)
                            })
                    }
                }

                if (archiDirectory.isDirectory()) {
                    // console.log('Es un directorio');
                    const arrayMd = [];
                    app.readDirectory(path).forEach(files => {
                        // console.log(files);
                        let mdExtension = app.extensionFolder(files);
                        if (mdExtension === '.md') {
                            arrayMd.push(files);
                        }
                    });

                    if (arrayMd == '') {
                        console.log(colors.red('Este directorio no contiene archivo(s) Markdown'));
                        exit();
                    } else {
                        console.log(colors.yellow('Este directorio contiene archivo(s) Markdown'));
                        console.log(arrayMd);
                        const optionPath = prompt('Escriba el nombre del archivo: ');
                        console.log('Loading ... ');
                        app.readFile(optionPath)
                            .then((arrayLink) => {
                                 promiseArrayFolder = arrayLink.map(element => app.validateLinks(element));
                                //  console.log('Hola promiseArrayFolder', promiseArrayFolder);
                                 return Promise.all(promiseArrayFolder);

                            })
                            .then((element) => {
                                if (options.stats) {
                                    app.counterLink(element);
                                }

                                if (options.validate) {
                                    app.statusLink(element);
                                }

                                if (options.stats && options.validate) {
                                    app.counterLink(element);
                                    app.statusLink(element);
                                }
                                resolve(element)
                            })

                    }

                }



            }

        } else {
            console.log(colors.yellow('Verifique el nombre del archivo o directorio'));
        }


    })

}

module.exports.mdLinks = mdLinks;