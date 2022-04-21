
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const { exit } = require('process')
const index = require('./index')
const prompt = require("prompt-sync")({ sigint: true });
const colors = require('colors/safe');

const linkArray = []

readline.question(colors.blue(`Ingrese una ruta: `), (route) => {
  console.log(index.fileRoute(route))
  console.log(index.verifyExistance(route))
  
  const typeOfArchive = index.kindOfRoute(route);
  const mdFiles = [];  
        if (typeOfArchive.isFile()){
        console.log(colors.yellow('El archivo existe 😃, verificaré su extensión.'))
        index.checkExtension(route)

      } if (typeOfArchive.isDirectory()) {
        index.directoryFiles(route).forEach(file => {
          let mdExt = index.filterMdFiles(file)
          if (mdExt == '.md') {
          mdFiles.push(file)
          }
        });     
          if(mdFiles == '') {
            console.log(colors.red('Este directorio no contiene archivos md, no tengo nada que hacer aquí 😔'))
            console.log(colors.bgMagenta(` Adiós 👋 `))
            exit()
          } else {
            console.log(colors.yellow('😃 El directorio existe y contiene los siguientes archivos md:'))
            console.log(mdFiles)
            const fileName = prompt(colors.blue('Por favor, ingrese el nombre del archivo que desea analizar: '));
            console.log(colors.yellow('El archivo contiene los siguientes links:'));
            return index.readFile(fileName);
            }
            
           }
             
      })






