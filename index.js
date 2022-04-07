// module.exports = () => {
//   // ...
// };

const readline = require('readline');
const app = require('./app.js');
let colors = require('colors');
// let colors = require('colors/safe');
let arrayObject = [];
let interfazCapture = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interfazCapture.question('Ingrese la ruta:', function(resp){
    console.log(`Su ruta es: ${resp}`);
    // filesCarpet(resp);
    console.log('las carpetas son:', resp);
    app.verifyAcces(resp).then(() => { 
        if (!app.pathAbsolute(resp)) {
         console.log('la ruta es relativa, por lo que debo transformarla a absoluta');
        resp = app.converToAbsolute(resp);
         console.log('Ahora la ruta es absoluta', resp);                
         }
         return resp;         
  }).then((resp) => {
      if (app.isFile(resp) ) {
        if (app.pathExtension(resp)) {
            console.log('contiene un docuemnto .md'.bgGreen);
          

        }
       
        else{
            // console.log(colors.bgRed('No es un .md'));
            console.log('No es un archivo .md'.bgRed);
            throw new TypeError();
        }  
      }
        else{
        console.log('No es un archivo');
        throw new TypeError();

    }
    return resp;
 }).then((resp) => {
  
    return app.readLines(resp);

 }).then((arrayLink) => {
    console.log('El array1 tiene que el valor:', arrayLink);
    const promiseArr = arrayLink.map((url) => app.verifyLinks(url).then((status) => {
      arrayObject.push(status);
    })
      .catch((err) => {
        console.log('La ruta  no existe');
        console.log(err);
      }));
    return Promise.all(promiseArr);

  
}).then((promiseArr) =>{
    console.log('el array de objetos es ', arrayObject);
})
interfazCapture.close();

});