#!/usr/bin/env node
// instancia de linea shebang
// usada para que npm funcione en todas las plataformas compatibles, incluso en windows


const colors = require('colors/safe');


const { readMdlinks } = require('./index');


process.stdout.write(colors.rainbow('=======================BIENVENIDOS ===========================\n'))
process.stdout.write(colors.green('Ingresa un archivo .md      coloca --stats  o   --validate\n'))


let route = process.argv[2];
let firtsOption = process.argv[3];//opción de 'validate' o 'stats'
let secondOption = process.argv[4];// opción de 'stats' o 'validate'

let opt = []

// si ingresa la opcion validate cambia a true
if(firtsOption === '--validate' || secondOption === '--validate'){
    opt.validate = true
    process.stdout.write(colors.rainbow('VALIDATE:\n'+ opt.validate+'\n'))
   
}
// si ingresa la opcion stats cambia a true
if(firtsOption === '--stats' || secondOption === '--stats'){
    opt.stats = true
    process.stdout.write(colors.rainbow('STATS:\n'+ opt.stats +'\n'))
   
}

//sino ingresa ninguna ruta le pide que ingrese una existente
if(route === false  || route === undefined){
    process.stdout.write(colors.red('Ingresa una ruta existente'))
    
}

readMdlinks(route,opt).then(() =>{
    
console.log()
 })
 .catch((error)=>{
    console.log(error) 
 });

