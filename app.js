const path = require('path');
let { constants, statSync, createReadStream } = require('fs');
let { readFile, access } = require('fs/promises');
// const { log } = require('console');
const readline = require('readline');
const http = require('http');
const { resolve } = require('dns');
// const { url } = require('inspector');
const { urlencoded } = require('express');
const  url  = require('url');

let array = [];

//para verificar si tiene extension .md
const pathExtension = (resp) => path.extname(resp) === '.md';

//para verificar si la ruta es absoluta
const pathAbsolute = (resp) => path.isAbsolute(resp);

//si no es absoluta transformarla a absoluta
const converToAbsolute = (resp) => path.resolve(resp);

//verificar que sea archivo 
function isFile(resp) {
  var stats = statSync(resp); // metadata
  console.log("Es archivo: ", stats.isFile());
  return stats.isFile();
}


//verifico si la ruta o archivo existe en la computadora
function verifyAcces(resp) {
  return access(resp, constants.R_OK);
};

//leer las lineas
function readLines(resp) {

  console.log('entrando a redlines', resp);

  return readFile(resp, 'utf8').then((resultado) => {
    console.log(resultado);
    let regular = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
    // arrayLink = [...resultado.matchAll(regular)];
    let arrayLink = resultado.match(regular);

    console.log('lo que resulta del array', arrayLink);
    return arrayLink;
  }).catch((err) => console.log("err", err))
}


//verificar el link y convertirlo a array de objetos
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
      console.log(`statusCode: ${res.statusCode}`)
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
exports.isFile = isFile;
exports.pathExtension = pathExtension;
exports.pathAbsolute = pathAbsolute;
exports.converToAbsolute = converToAbsolute;
exports.verifyAcces = verifyAcces;
exports.readLines = readLines;
exports.verifyLinks = verifyLinks;