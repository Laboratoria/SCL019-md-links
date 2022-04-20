const { mdLinks } = require('./md-links')

//Se almacenan los inputs de le usuarie en la terminal/consola en un array de argumentos
const arguments = process.argv;
//console.log(arguments);

//Se crea el objeto de options que será definido por los argumentos
const options = {};

//Se crea constante que almacenará el string correspondiente a la ruta ingresada
let route = '';

//El método some revisa si alguno de los elementos del array coincide con alguna de la condición especificada
if (arguments.some((input) => input === '--validate')) {
    options.validate = true;
}

if (arguments.some((input) => input === '--stats')) {
    options.stats = true;
}

if (arguments[0] === 'md-links') {
    route = arguments[1];
} else {
    route = arguments[2];
}

mdLinks(route, options).then(() => {
    console.log();
}).catch((error) => {
    console.trace(error);
})

