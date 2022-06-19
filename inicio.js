
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




function readMd(route){
    //nueva promesa
    const promise = new Promise((resolve)=>{
        const arrayLine=[];
        // lee el archivo md, y crea una interface de readline
         const lector =readline.createInterface({
             //para leer en el file
             input:fs.createReadStream(route)
         });
         // expresiones regulares, le agregamos el flat g, me trae todas las coincidencias del patron dado
         let regular = /(https?:\/\/)(www\.)?[-a-z-0-9@:%._\+~#=]{1,256}\.[a-z-0-9()]{1,6}\b([-a-z-0-9()!@:%_\+.~#?&\/\/=]*)/gi;
         //cada vez que se encuentre una linea se llama al evento line que es un callback
         lector.on('line', linea =>{
             // se prueba con test si regular existe dentro de linea, devuelve un boleano
             if(regular.test(linea)){
                 
                 // hacer el match y se guarda en arrayLink
                let arrayLink =linea.match(regular);
               
                //se agrega en el array vacio
                arrayLine.unshift(arrayLink[0])
                }
           //evento se cierra 
     }).on('close',() => {
         //resuelve 
         resolve(arrayLine)
     });
 });
 return promise
 }


 exports.pathAbsolute = pathAbsolute;
 exports.verifyExistence= verifyExistence;
 exports.verifyExtension= verifyExtension;
 exports.converToAbsolute= converToAbsolute;
 exports.fileExistence = fileExistence
 exports.fileRead= fileRead;
 exports.readMd = readMd
    


