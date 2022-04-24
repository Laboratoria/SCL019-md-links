#!/usr/bin/env node
// instancia de linea shebang
// usada para que npm funcione en todas las plataformas compatibles, incluso en windows


const colors = require('colors/safe');
const {stats,validate, linksStatus} = require('./validate_stats')
const {verifyExistence, pathAbsolute,verifyExtension,fileRead,readMd, converToAbsolute}= require('./inicio.js');

const { readMdlinks } = require('./links');


process.stdout.write(colors.rainbow('=======================BIENVENIDOS ===========================\n'))



let route = process.argv[2];
let firtsOption = process.argv[3];//opción de 'validate' o 'stats'
let secondOption = process.argv[4];// opción de 'stats' o 'validate'

let opt = {};

// si ingresa la opcion validate cambia a true
if(firtsOption === '--validate' || secondOption === '--validate'){
    opt.validate = true
    process.stdout.write(colors.rainbow('VALIDATE:\n'+ opt.validate+'\n'))
    //console.log('VALIDATE:', opt.validate)
}
// si ingresa la opcion stats cambia a true
if(firtsOption === '--stats' || secondOption === '--stats'){
    opt.stats = true
    process.stdout.write(colors.rainbow('STATS:\n'+ opt.stats +'\n'))
    //console.log('STATS:',opt.stats)
}
//sino ingresa ninguna ruta le pide que ingrese una existente
if(route === false  || route === undefined){
    process.stdout.write(colors.red('Ingresa una ruta existente'))
    //console.log('Ingresa una ruta existente')
}

readMdlinks(route,opt).then(() =>{
     
//process.stdout.write(colors.blue(result))    
console.log('HOLA')
 })
 .catch((error)=>{
    console.log(error) 
 });


//  readMdlinks(route, {'stats':true,'validate':true,}).then(result =>{
//    // process.stdout.write(colors.blue(result))    
//     console.table('HOLA',result)
//      })
//      .catch((error)=>{
//         console.log(error) 
//      });
    
