// importo con un require lo que necesito
let fs = require('fs/promises');
let {constants} = require('fs');
const path = require('path');
//function para leer la ruta que ingreso

// function readFiles(resp){
//     fs.readFile(resp,function(err,data){

//         if(err){
//             console.log('el error es:', err);
//         }
//         console.log('El archivo contenia las siguientes lineas');
//         console.log(data.toString());
        
//         });
// }
// verifico la extension del archivo
const readExtension = (resp) => path.extname(resp) === '.md';

// verifico que la ruta sea absoluta
const pathAbsolute = (resp) => path.isAbsolute(resp);

//transformo la ruta relativa en absoluta
const pathTransformationAbsolute = (resp) =>path.resolve(resp);

//verifico si la ruta o archivo existe en la computadora

// Check if the file exists in the current directory.
// const existFile = fs.access(resp, constants.F_OK, (err) => {
//     console.log(`${resp} ${err ? 'does not exist' : 'exists'}`);
//   });
function existFile(resp){
  return fs.access(resp, constants.R_OK);
}

//exporto las funciones que necesito
exports.readExtension =readExtension;
exports.pathAbsolute = pathAbsolute;
exports.pathTransformationAbsolute =pathTransformationAbsolute;
exports.existFile = existFile;