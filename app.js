let fs = require('fs');
const path = require('path');



//-----Determinar si la ruta es absoluta -------
const pathAbsolute = (ruta)=>{
  const absolute = path.isAbsolute(ruta);
  if (absolute) {
    console.log(`la ruta es absoluta`);
  }else {
    console.log(`La ruta es relativa, será convertida en absoluta.`);
    path.resolve(ruta);

  }
} 
//---- Verifica si la ruta existe o no ----
const routeExist = (ruta)=> fs.existsSync(ruta);

//------- Verificar que es archivo o directorio
const archiDirectory= (ruta) => fs.statSync(ruta);

//--- Saber la extension del archivo
const extension= (ruta) => path.extname(ruta);

//--- Leer archivos dentro del directo 
const readDirectory = (ruta) => fs.readdirSync(ruta);

module.exports.pathAbsolute = pathAbsolute;
module.exports.routeExist = routeExist;
module.exports.archiDirectory = archiDirectory;
module.exports.extension = extension;
module.exports.readDirectory = readDirectory;

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