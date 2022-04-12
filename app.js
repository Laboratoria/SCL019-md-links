let fs = require('fs');
const path = require('path');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question('Ingresa la ruta: ', route => { // input que solicita al usuario ingresar el arcgivo
  const ruta = path.resolve(route);
  console.log(`la ruta del archivo es: ${ruta}`); //Muestra la ruta del archivo
  fs.readFile(route, (err, route) => { 
    if(err) {
      console.log('error: ', err);
    } else {
      console.log( route.toString()); //Muestra el contenido del archivo en la consola
    }
  });
  readline.close();
});

//-----Determinar si la ruta es absoluta -------
const pathAbsolute = (ruta)=>{
  path.isAbsolute(ruta);
  console.log(`la ruta es absoluta ${pathAbsolute}`);
} 
  

/*----permite verificar si un archivo o carpeta existe

fs.stat('nuevo.txt', function(err) {
  if (err == null) {
    console.log("El archivo existe");
  } else if (err.code == 'ENOENT') {
    console.log("el archivo no existe");
  } else {
    console.log(err); // ocurrió algún error
  }
})*/