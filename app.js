
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const index = require('./index')


readline.question(`Ingresa una ruta: `, (route) => {
  index.fileRoute(route)
  index.verifyExistance(route)
  index.kindOfRoute(route)
  index.readFile(route) 
})




