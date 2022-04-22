const path = require('path');
const app = require('./app.js');
// const { env } = require('process'); 

const mdLinks = (path, options) => {

    return new Promise((resolve) => {

        if (app.routeExist(path)) {

            path = app.pathAbsolute(path);

            if (app.archiDirectory(path)) {
                console.log('2do if');
                const archiDirectory = app.archiDirectory(path);

                if (archiDirectory.isFile(path)) {
                    console.log('Es archivo', archiDirectory.isFile());

                    if (app.extension(path)) {
                        console.log('4to if');

                          app.readFile(path)
                         .then((arrayLink)=> {

                             console.log('Hola arrayLink', arrayLink);
                         })
                    
                            // console.log('readFile', readFile);
                            // const promiseArr = arrayLink.map((url) => app.validateLinks(url).then((status) => {
                            //     console.log('Hola promiseArr',promiseArr);
                            //     arrayObject.push(status);
                            // })
                            //     .catch((err) => {
                            //         console.log('La ruta  no existe'.bgRed);
                            //         console.log(err);
                            //     }));
                            // return Promise.all(promiseArr);

                    }



                } else {
                    console.log('Es un directorio');
                }


            }
        }


    })

}

module.exports.mdLinks = mdLinks;