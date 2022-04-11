const fs = require('fs')
//const { url } = require('inspector')
const path = require('path')
const { exit } = require('process')
const readline = require('readline')
const url = require('url')

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
      console.log('El directorio existe y contiene los siguientes archivos md:')
      directoryFiles(route).forEach(file => filterMdFiles(file)) 
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

const directoryFiles = (folderPath) => fs.readdirSync(folderPath)

const filterMdFiles = file => {
  const mdFile = path.extname(file)
  if (mdFile == '.md') {
    console.log(file)
  }
}

const readFile = (fileName) => {
  fs.readFile(fileName, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const urlRegExp = /[(https?):\/\/(www\.)?\w@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-\w@:%\+.~#?&//=]*)/gi
    const links = data.match(urlRegExp);
    console.log(links) 
  })
      
    }


/*const readFile = (fileName) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfDelay: Infinity
  });
  
  rl.on('line', (line) => {
    const urlRegExp = /[\((http(s)?):\/\/(www\.)?\w@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-\w@:%\+.~#?&//=]*)/
    const links = line.match(urlRegExp)
    if (links) {
      links.forEach(link =>console.log(link));
    } 
    
  });
}*/

module.exports.fileRoute = fileRoute;
module.exports.verifyExistance = verifyExistance;
module.exports.kindOfRoute = kindOfRoute;
module.exports.checkExtension = checkExtension;
module.exports.readFile = readFile;