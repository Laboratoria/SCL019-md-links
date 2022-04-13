
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const { exit } = require('process')
const index = require('./index')
const prompt = require("prompt-sync")({ sigint: true });


readline.question(`Ingrese una ruta: `, (route) => {
  index.fileRoute(route)

  index.verifyExistance(route)
  
  const typeOfArchive = index.kindOfRoute(route);
  const mdFiles = [];  
        if (typeOfArchive.isFile()){
        console.log('El archivo existe')
        index.checkExtension(route)

      } if (typeOfArchive.isDirectory()) {
        index.directoryFiles(route).forEach(file => {
          let mdExt = index.filterMdFiles(file)
          if (mdExt == '.md') {
          mdFiles.push(file)
          }
        });     
          if(mdFiles == '') {
            console.log('Este directorio no contiene archivos md')
            exit()
          } else {
            console.log('El directorio existe y contiene los siguientes archivos md:')
            console.log(mdFiles)
            const fileName = prompt('Por favor, ingrese el nombre del archivo que desea analizar: ');
            index.readFile(fileName);
           }
             
      }
    })

//Verificar si la ruta ingresada existe en el sistema OK
//Si existe, verificar si es un archivo o un directorio
//Si es un archivo, verificar si es de tipo md
//Si es md, leer el archivo y reconocer los links




