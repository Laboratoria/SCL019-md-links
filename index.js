const app = require('./app.js');
const path = require('path');
const { exit } = require('process')

let fs = require('fs');


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Ingresa la ruta: ', route => { // input que solicita al usuario ingresar el archivo
    // console.log(`la ruta del archivo es: ${ruta}`); //Muestra la ruta del archivo
    app.pathAbsolute(route);   
    const routeExist = app.routeExist(route)
    if (routeExist == false){
        console.log ("No existe la ruta")
        // readline.close();
        exit();
    }
    else {
    console.log("La ruta existe:", routeExist);
    }

    const archiDirectory = app.archiDirectory(route);

    if (archiDirectory.isFile()){
        console.log('Es archivo');
        const extension = app.extension(route);
        if (extension == '.md'){
            console.log('Es un archivo .md');
        } else{
            console.log('No es un archivo .md');
            exit();
        }
    }

    if (archiDirectory.isDirectory()){
        const arrayMd = [];
        const readDirectory = app.readDirectory(route).forEach(files => {
            const mdExtension = app.extension(files)
            if (mdExtension == '.md') {
                // console.log(files);
                arrayMd.push(files);
            } 
        });
        
        if (arrayMd == ''){
            console.log('Este directorio no contiene archivos .md');
            exit();
        }else{
            console.log('Es directorio contiene archivos con la extesion .md');
            console.log(arrayMd);

        }
        // const mdFiles = readDirectory.
    }

    // fs.readFile(route, (err, route) => { 
    //     if(err) {
    //     console.log('error: ', err);
    //   } else {
    //     console.log( route.toString()); //Muestra el contenido del archivo en la consola
    //   }
    // });
    readline.close();
  });

