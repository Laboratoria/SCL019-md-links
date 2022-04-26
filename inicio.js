
// importo los modulos de node.js
const fs = require('fs');
const { existsSync } = require('fs')
const {readFile} = require('fs/promises')
const path = require('path');
const readline = require('readline');


//verifico existencia de ruta
const verifyExistence =(route)=> existsSync(route);
//para verificar si la ruta es absoluta
const pathAbsolute = (route) => path.isAbsolute(route);
//se  transforma a absoluta
const converToAbsolute = (route) => path.resolve(route);
//leer el archivo             ruta y codificacion 
const fileRead = (route) =>readFile(route, 'utf8')
//verificar la extension del archivo 
const verifyExtension = (route) =>(path.extname(route)==='.md');

// funcion para saber si es un archivo que existe
const fileExistence = (route) => fs.statSync(route).isFile();
// funcion para saber si existe el directorio
const directoryExistence = (route) => fs.lstatSync(route).isDirectory();



function readMd(route){
    //file='README.md';
    const promise = new Promise((resolve)=>{
        const arrayLine=[];
        // lee el archivo md, y crea una interface
         const lector =readline.createInterface({
             input:fs.createReadStream(route)
         });
         // expresiones regulares
         let regular = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
         
         lector.on('line', linea =>{
             if(regular.test(linea)){
                 //console.log('holiss' + lector)
                let arrayLink =linea.match(regular);
                //console.log('chaito \n' + arrayLink)
                //lo coloca el nuevo array al principio
                arrayLine.unshift(arrayLink[0])
               //arrayLine.push(arrayLink[0]);
             }
           //resuelve al final  
     }).on('close',() => {
         resolve(arrayLine)
     });
 });
 return promise
 }


 exports.pathAbsolute = pathAbsolute;
 exports.verifyExistence= verifyExistence;
 exports.verifyExtension= verifyExtension;
 exports.fileExistence = fileExistence;
 exports.converToAbsolute= converToAbsolute;
 exports.directoryExistence = directoryExistence;
 exports.fileRead= fileRead;
 exports.readMd = readMd
    
//  module.exports = {
//     pathAbsolute,
//     verifyExistence,
//     verifyExtension, 
//     fileExistence,
//     converToAbsolute,
//     directoryExistence,
//     fileRead,readMd
//     }


