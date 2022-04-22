const colors = require('colors/safe');
let fs = require('fs');
const { exit } = require('process')
const path = require('path');
const https = require('https')
const url = require('url');

//---- Verifica si la ruta existe o no ---- ///// ok!
const routeExist = (ruta) => fs.existsSync(ruta);

//-----Determinar si la ruta es absoluta ------- //// ok!
const pathAbsolute = (ruta) => {
  const absolute = path.isAbsolute(ruta);
  if (absolute) {
    console.log(`la ruta es absoluta`);
    return absolute;
  } else {
    console.log(`La ruta es relativa, será convertida en absoluta.`);
    console.log(path.resolve(ruta));
    return path.resolve(ruta);
  }
}

//------- Verificar que es archivo o directorio //// ok!
const archiDirectory = (ruta) => fs.statSync(ruta);

//--- Saber la extensión del archivo /// ok!
const extension = (ruta) => {
  const extRut = path.extname(ruta);
  if (extRut === '.md'){
    console.log('Es un archivo .md');
    // const urlValidate = app.readFile(path);
    return true;
} else{
    console.log('No es un archivo .md');
    exit();
}
}
//--- Leer archivos //// ok!

const readFile = (ruta) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (err, route) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      const expresionRegular = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
      const arrayUrl = route.match(expresionRegular);
      
      // console.log('hola url',arrayUrl);
      
      // const urlPromesa = validateLinks(arrayUrl);
      
      // urlPromesa.then((linkStatus) => {
        //   console.log(linkStatus);
        // validate(url);
        // }) 
        resolve(arrayUrl);
      
    })
  })
}

//--- Leer archivos dentro del directorio
const readDirectory = (ruta) => fs.readdirSync(ruta);

function validateLinks(link) {
  
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      host: url.parse(link).host,
      port: 443,
      path: url.parse(link).pathname,
    };
    const req = https.request(options, (res) => {
      const nuevaData = {
        linkname: link,
        Code: res.statusCode,
        status: res.statusCode <= 399,
      };
      resolve(nuevaData); 
    })

    req.on('error', (error) => {
      // console.error(error);
      const newData = {
        linkname: link,
        status: false,
      };
      resolve(newData);
    });
    req.end()
  })
}

// function validate(array) {
//   array.forEach((e) => {
//     if (e.status) {
//       console.log(colors.green(`Link: ${e.linkname} Status: ${e.status}`));
//     } else {
//       console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
//     }
//   });
// } 

module.exports.pathAbsolute = pathAbsolute;
module.exports.routeExist = routeExist;
module.exports.archiDirectory = archiDirectory;
module.exports.extension = extension;
module.exports.readDirectory = readDirectory;
module.exports.readFile = readFile;
module.exports.validateLinks = validateLinks;



