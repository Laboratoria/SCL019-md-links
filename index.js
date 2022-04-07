const fs = require('fs')
const path = require('path')
const { exit } = require('process')

//console.log("Ingresa una ruta") 
//process.stdout.write("Ingresa una ruta") Cuál es la diferencia?

const fileRoute = (route) => {
  const fileAbsolute = path.resolve(route)
  console.log(`La ruta absoluta es ${fileAbsolute}`)
}

const verifyExistance = (route) => {
  const fileExist = fs.existsSync(route) 
  if (!fileExist) {
    console.log('Esta ruta no existe')
    exit()
  }}

const kindOfRoute = (route) => {
  const typeOfArchive = fs.statSync(route)
      if (typeOfArchive.isFile()){
      console.log('El archivo existe')
      checkExtension(route)
    } if (typeOfArchive.isDirectory()) {
      console.log('El directorio existe')
    }
}

const checkExtension = (route) => {
if (path.extname(route) !== '.md') {
  console.log('El archivo no es de tipo .md')
  exit()
}  else {
  console.log('El archivo es de tipo .md') 
} 
}

module.exports.fileRoute = fileRoute;
module.exports.verifyExistance = verifyExistance;
module.exports.kindOfRoute = kindOfRoute;
module.exports.checkExtension = checkExtension;