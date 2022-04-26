const fs = require('fs/promises');
const colors =require('colors')
// const{ readFile  }= require('fs');
const readline = require('readline');
const path = require('path');
//const fs = require('fs');
const url = require('url');
const inicio = require('./inicio.js');
const { exit } = require('process');
const validate_stats =require('./validate_stats')
const {stats,
    validate, linksStatus} = require('./validate_stats')


// //creo el input para que ingrese la ruta el usuario..se crea la interfaz
// const rl= readline.createInterface(process.stdin,process.stdout)
// //funcion callback ruta, que es respuesta a pregunta
// rl.question((colors.red('BIENVENIDOS \nIngresa tu ruta:\n')), (ruta)=>{
//     //se almacena en un variable
//         let route =`${ruta}`;
//         readMdlinks(route)
//     })


//creo una funcion con promesa
const readMdlinks =(route,opt) =>{
    //nueva promesa que tiene parametros , resolver o rechazar
    return new Promise((resolve, reject) =>{
        //array vacio para guardar links
        let newArray =[];
//si la ruta existe
    if (inicio.verifyExistence(route)&& inicio.verifyExtension(route)) {
        //process.stdout.write(colors.blue('Tu ruta Existe! \n'));
        //si la ruta absoluta no es absoluta, la transformas a absoluta,
        //inicio.pathAbsolute(route) === false ? route = path.resolve(route) : route;
        //process.stdout.write(colors.magenta('Tu ruta absoluta es: \n'+ route + '\n'));
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
   // console.log('olaaaa' + data)
    //los coloco en el array que declare vacio
    newArray.push(data)
   
   })
return newArray

//entonces
 })
 
.then((newArray) =>{
  
    // creo un array nuevo y válido el estado de los links 
 const arrayPromise = newArray.map((ref) => linksStatus(ref.href))
 //retorno todas las promesas
 return Promise.all(arrayPromise);
}) 
.then((result) =>{
//.then((result) =>{
   if(opt.validate && opt.stats){
      // options(result);
      validate(result);
      stats(result);
   }else{
     if(opt.validate) {
       validate(result);  
       //console.log(route)
    }
      if(opt.stats) {
       stats(result);
       
       }
   }
   resolve(result)
    //resolve(option);
})
.catch((error) =>{
    console.log(error);
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

