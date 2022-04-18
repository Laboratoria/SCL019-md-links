let fs = require('fs');
const path = require('path');



//-----Determinar si la ruta es absoluta -------
const pathAbsolute = (ruta) => {
  const absolute = path.isAbsolute(ruta);
  if (absolute) {
    console.log(`la ruta es absoluta`);
  } else {
    console.log(`La ruta es relativa, será convertida en absoluta.`);
    path.resolve(ruta);

  }
}
//---- Verifica si la ruta existe o no ----
const routeExist = (ruta) => fs.existsSync(ruta);

//------- Verificar que es archivo o directorio
const archiDirectory = (ruta) => fs.statSync(ruta);

//--- Saber la extensión del archivo
const extension = (ruta) => path.extname(ruta);

//--- Leer archivos dentro del directorio
const readDirectory = (ruta) => fs.readdirSync(ruta);

const readFile = (ruta) => fs.readFile(ruta, 'utf8', (err, route) => {
  if (err) {
    console.log('error: ', err);
  } else {
    // console.log( route.toString()); //Muestra el contenido del archivo en la consola
    const expresionRegular = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
    const url = route.match(expresionRegular);
    console.log(url);

  }
});

function verifyLinks(link) {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      host: url.parse(link).host,
      port: 80,
      path: url.parse(link).pathname,
    };
    const req = http.request(options, (res) => {
      const nuevaData = {
        linkname: link,
        Code: res.statusCode,
        status: res.statusCode <= 399,
      };
      // console.log(`statusCode: ${res.statusCode}`)
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

module.exports.pathAbsolute = pathAbsolute;
module.exports.routeExist = routeExist;
module.exports.archiDirectory = archiDirectory;
module.exports.extension = extension;
module.exports.readDirectory = readDirectory;
module.exports.readFile = readFile;



