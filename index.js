const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const readline = require('readline')
const colors = require('colors/safe');
const https = require('https');
const url = require('url');


//Se convierte la ruta a absoluta
const fileRoute = (route) => path.resolve(route)

//Se busca el archivo o directorio en el sistema para verificar su existencia
const verifyExistance = (route) => {
  const fileExist = fs.existsSync(route)
  if (!fileExist) {
    console.log(colors.red(`Esta ruta no existe 😱`))
    console.log(colors.bgMagenta(` Adiós 👋 `))
    exit()
  }
}

//Función que identifica si la ruta ingresada es un archivo o un directorio  
const kindOfRoute = (route) => fs.statSync(route)

//Función que chequea la extensión del archivo 
const checkExtension = (route) => {
  if (path.extname(route) !== '.md') {
    console.log(colors.red('El archivo no es de tipo .md, así no puedo trabajar 😒'))
    console.log(colors.bgMagenta(` Adiós 👋 `))
    exit()
  } else {
    console.log(colors.yellow('El archivo es de tipo .md, comenzaré el análisis...'))
  }
}

//Función que lee el contenido de un directorio
const directoryFiles = (folderPath) => fs.readdirSync(folderPath)

//Función que revisa la extensión de un archivo
const filterMdFiles = (file) => path.extname(file)

//Esta promesa lee los links y verifica su status
const linkValidation = (link) => {
  return new Promise((resolve) => {
    //options detalla las características de la petición http
    const options = {
      method: 'HEAD',
      hostname: url.parse(link).host, //ruta donde se envía la petición
      port: 443, //canal del servidor, que escucha la petición, suele ocuparse el 80
      path: url.parse(link).pathname, //todo lo que está después del slash
    }
    console.log(options)

    const req = https.request(options, response => {
      //console.log(response)
      const validSatus = {
        linkname: link,
        Code: response.statusCode,
        status: response.statusCode <= 399,
      };
      resolve(validSatus);

    })

    req.on('error', error => {
      //console.error(error)
      const invalidStatus = {
        linkname: link,
        status: false,
      };
      resolve(invalidStatus); //en promesas, resolve = return
    })

    req.end()

    //htttp request, se le dan 2 parametros, uno de ellos options, el otro es un callback de la función que revise el status
  })
} 



//Función que lee el contenido del archivo md e identifica los links
const readFile = (fileName) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      const urlRegExp = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi
      const links = data.match(urlRegExp);
      
      resolve(links)

    })
  })
  
}

//Función que cuenta los links funcionales y rotos y muestra los totales en consola
const linkCounter = (array) => {
  let workingLinks = 0;
  let brokenLinks = 0;

  array.forEach((element) => {
    if (element.status) {
      workingLinks += 1
    } else {
      brokenLinks += 1
    }  
  });
  console.log(colors.blue('Total de links:', array.length));
  console.log(colors.green('Links funcionales:', workingLinks));
  console.log(colors.red('Links rotos:', brokenLinks));
}

//Función que recorre el array de links y de acuerdo a sus status, nos entrega información acerca de cuáles están rotos y cuáles funcionan
const statusData = (array) => {
  console.log(colors.yellow('Los links funcionales se muestran en verde y los rotos en rojo:'))
  array.forEach((element) => {
    if (element.status) {
      console.log(colors.green(`Link: ${element.linkname} Status: OK`));
    } else {
      console.log(colors.red(`Link: ${element.linkname} Status: FAIL`));
    }
  });
}


module.exports.fileRoute = fileRoute;
module.exports.verifyExistance = verifyExistance;
module.exports.kindOfRoute = kindOfRoute;
module.exports.checkExtension = checkExtension;
module.exports.readFile = readFile;
module.exports.filterMdFiles = filterMdFiles;
module.exports.directoryFiles = directoryFiles;
module.exports.linkValidation = linkValidation;
module.exports.linkCounter = linkCounter;
module.exports.statusData = statusData;