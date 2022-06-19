//importo los modulos de node.js
const fs = require('fs/promises');
const colors =require('colors')
const readline = require('readline');
const path = require('path');
const inicio = require('./inicio.js');
const { exit } = require('process');
const {stats,
    validate, linksStatus} = require('./validate_stats')


//creo el input para que ingrese la ruta el usuario..se crea la interfaz
const rl= readline.createInterface(process.stdin,process.stdout)
//funcion callback route, que es respuesta a pregunta
rl.question((colors.red('BIENVENIDOS \nIngresa tu ruta:\n')), (route)=>{
            readMdlinks(route)
    })


//creo una funcion con promesa
const readMdlinks =(route,opt) =>{
    //nueva promesa que tiene parametros , resolver o rechazar
    return new Promise((resolve, reject) =>{
        //array vacio para guardar links
        let newArray =[];
//si la ruta existe
    if (inicio.verifyExistence(route)&& inicio.verifyExtension(route)) {
        process.stdout.write(colors.blue('Tu ruta Existe! \n'));
        //si la ruta absoluta no es absoluta, la transformas a absoluta,operador ternario
        inicio.pathAbsolute(route) === false ? route = path.resolve(route) : route;
        process.stdout.write(colors.magenta('Tu ruta absoluta es: \n'+ route + '\n'));
    // si es un archivo
     }
    else if(!inicio.verifyExtension(route) ){
        process.stdout.write(colors.cyan(' no es archivo .md \n'))
       //si no existe  la ruta
              exit();
    }
    //verifica si es ruta .md
    if(inicio.verifyExtension(route)){
        // leo el archivo y que me devuelva los links
  inicio.readMd(route).then((arrayLink) =>{
  //console.log(arrayLink)
      
   arrayLink.forEach((ref) =>{
    //guardo la data en una variable,  le doy las propiedades
    const data ={
    href: ref,
    file: route,
        }
    //los coloco en el array que declare vacio
    newArray.push(data)
   
   })
return newArray

//entonces
 })
 
.then((newArray) =>{
  
    // creo un array nuevo y agrego a los los links
 const arrayPromise = newArray.map((ref) => linksStatus(ref.href))
 //retorno todas las promesas
 return Promise.all(arrayPromise);
}) 
.then((result) =>{

      validate(result);
      stats(result);
   
   resolve(result)
   
})
.catch((error) =>{
    console.log(error);
    //ruta o archivo no encontrado
    if(error.code ==='ENOENT'){
        console.log('path no encontrada');
    }else{
        
        console.log(error.message)
    }
})
}
else {
    
    console.log('no ingreso ruta')
}
});
};




module.exports = {
    readMdlinks 
    
}

