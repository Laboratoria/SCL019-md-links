const fs = require('fs')
const path = require('path')
const { exit } = require('process')
//const process = require('process')
//const url = require('url')
const readline = require('readline')
const colors = require('colors/safe');


//console.log("Ingresa una ruta") 
//process.stdout.write("Ingresa una ruta") Cuál es la diferencia?

//Se convierte la ruta a absoluta
const fileRoute = (route) => path.resolve(route)

//Se busca el archivo o directorio en el sistema para verificar su existencia
const verifyExistance = (route) => {
  const fileExist = fs.existsSync(route) 
  if (!fileExist) {
    console.log(colors.red(`Esta ruta no existe 😱`))
    console.log(colors.bgMagenta(` Adiós 👋 `))
    exit()
  }}

//Se identifica si la ruta ingresada es un archivo o un directorio  
const kindOfRoute = (route) => fs.statSync(route)

const checkExtension = (route) => {
if (path.extname(route) !== '.md') {
  console.log(colors.red('El archivo no es de tipo .md, así no puedo trabajar 😒'))
  console.log(colors.bgMagenta(` Adiós 👋 `))
  exit()
}  else {
  console.log(colors.yellow('El archivo es de tipo .md y contiene los siguientes links:'))
  readFile(route) 
} 
}

const directoryFiles = (folderPath) => fs.readdirSync(folderPath)

const filterMdFiles = (file) => path.extname(file) 



/*const readFile = (fileName) => {
  fs.readFile(fileName, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const urlRegExp = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi
    //const urlRegExp = /[(https?):\/\/(www\.)?\w@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-\w@:%\+.~#?&//=]*)/gi
    const links = data.match(urlRegExp);
    console.log(links) 
  })
      
    }*/

const linksArr = []
const readFile = (fileName) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfDelay: Infinity
  });
  rl.on('line', (line) => { 
    const urlRegExp = /(https?:\/\/)(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()!@:%_\+.~#?&\/\/=]*)/gi
    const links = line.match(urlRegExp)
     if (links) {
       console.log(links)
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