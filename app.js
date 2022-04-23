const colors = require('colors/safe');
let fs = require('fs');
const { exit } = require('process')
const path = require('path');
const https = require('https')
const url = require('url');

const { fail } = require('assert');

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
  if (extRut === '.md') {
    console.log('Es un archivo .md');
    // const urlValidate = app.readFile(path);
    return true;
  } else {
    console.log(colors.red('No es un archivo Mardown'));
    exit();
  }
}
//--- Leer archivos dentro del directorio 
const readDirectory = (ruta) => fs.readdirSync(ruta);

//Función que revisa la extensión de un archivo
const extensionFolder = (file) => path.extname(file)
//--- Leer archivos //// ok!

const readFile = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (err, route) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      const expresionRegular = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
      const arrayUrl = route.match(expresionRegular);
      // console.log('hola url',arrayUrl)
      resolve(arrayUrl);

    })
  })
}


//Esta funcion permite validar el status del link ///ok!
function validateLinks(link) {
  return new Promise((resolve) => {

    const options = {
      method: 'HEAD',
      host: url.parse(link).host,
      port: 443,
      path: url.parse(link).pathname,
    };
    // console.log('validate link - options', options);
    const req = https.request(options, (res) => {
      // console.log(res);
      const nuevaData = {
        linkname: link,
        host: options.host,
        Code: res.statusCode,
        status: res.statusCode <= 399,
      };
      // console.log('validate link - options', nuevaData);
      resolve(nuevaData);
    })

    req.on('error', (error) => {
      // console.error(error);
      const linkFail = {
        linkname: link,
        status: false,
        host: options.host,
      };
      resolve(linkFail);
    });
    req.end()
  })
}
// En está función se cuentan los links operativos, no operativos /// ok!
const counterLink = (array) => {
  let linkOk = 0;
  let linkNotOk = 0;

  array.forEach((element) => {
    // console.log(element.Code);

    // preguntar: si es element Code o status, porque status su respuesta es boolean /// ok!
    if (element.Code <= 399) {
      linkOk += 1;
    } else {
      linkNotOk += 1;
    }
  });
  console.log('Total de links', array.length);
  console.log(colors.green('Links OK:'), colors.white(`${linkOk}`));
  console.log(colors.red('Links FAIL:'), colors.white(`${linkNotOk}`));
};

const statusLink = (array) => {
  array.forEach((element) => {
    if (element.status) {
      console.log(colors.green(`${element.linkname}`), 'ok', colors.yellow(`${element.Code}`), colors.blue(`${element.host}`));
    } else {
      console.log(colors.red(`${element.linkname}`), 'fail', colors.yellow(`${element.Code}`), colors.blue(`${element.host}`));
    }

  });
}

module.exports.pathAbsolute = pathAbsolute;
module.exports.routeExist = routeExist;
module.exports.archiDirectory = archiDirectory;
module.exports.extension = extension;
module.exports.readDirectory = readDirectory;
module.exports.readFile = readFile;
module.exports.validateLinks = validateLinks;
module.exports.counterLink = counterLink;
module.exports.statusLink = statusLink;
module.exports.extensionFolder = extensionFolder;


