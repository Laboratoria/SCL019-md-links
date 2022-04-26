const app = require('../app.js');
const index = require ('../index.js');
const directory = './';
const documentMd = './readme2.md'; 
const documentErr = './text.tx';
const extension = './README.md';
const arrayLink = [
  'https://www.google.cl/',
  'https://miro.com/app/board/uXjVO_xeano=/',
  'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)'
];

const linkOk = 'https://www.google.cl/';
const validateLinkOk = {"Code": 200, "host": "www.google.cl", "linkname": "https://www.google.cl/", "status": true};
const linkFail =   'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)';
const validateLinkFail = {"host": "community.laboratoria.la", "linkname": "http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)", "status": false};
const resolveMdlinks = [{"Code": 200, "host": "www.google.cl", "linkname": "https://www.google.cl/", "status": true}, {"Code": 302, "host": "miro.com", "linkname": "https://miro.com/app/board/uXjVO_xeano=/", "status": true}, {"host": "community.laboratoria.la", "linkname": "http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)", "status": false}];

// Test para validar la existencia de la ruta
describe('La función routeExist valida si la ruta existe', () => {

  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof app.routeExist).toBe('function');
  });
  it ('Si la ruta existe retorna True.', () =>{   /// ok!
    expect(app.routeExist(documentMd)).toBe(true);
  });
  it('Retorna False si la ruta no existe.', () =>{ //ok!
    expect(app.routeExist(documentErr)).toBe(false);

  })

});
// Test para validar si la ruta es absoluta o 
describe ('La función pathAbsolute determina que tipo de ruta se esta ingresando (absoluta o relativa)', () => {
  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof app.pathAbsolute).toBe('function');
  });

  // it('Retorna True si la ruta es absoluta', () => {
  //   expect(app.pathAbsolute(extension).toBe(true));
  // })

});

//Test valida la extención del archivo
describe ('La función extension valida que sea una extension .md ', () => {
  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof app.extension).toBe('function');
  });

  it('Retorna true si el archivo tiene extension md', () =>{
    expect(app.extension(extension)).toBe(true);
  });

  it('Retorna false si el archivo no tiene extension md', () =>{
    expect(app.extension(documentErr)).toBe(false);
  });
});

describe ('La función readFile retorna el array de links de un archivo', () =>{
  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof app.readFile).toBe('function');
  });
  test('Retorna array con los links del archivo', async() =>{
    expect(await app.readFile(documentMd)).toStrictEqual(arrayLink);
  })
})

describe ('La función validateLinks  retorna propiedades', () =>{
  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof app.validateLinks).toBe('function');
  });
  test('Retorna array con los links del archivo', async() =>{
    expect(await app.validateLinks(linkOk)).toStrictEqual(validateLinkOk);
  })
  test('Retorna array con los links del archivo', async() =>{
    expect(await app.validateLinks(linkFail)).toStrictEqual(validateLinkFail);
  })

})

describe ('La función mdLinks retorna data y estatus de los links', () =>{
  it('Validamos de que es una función.', () => {   ///ok!!
    expect(typeof index.mdLinks).toBe('function');
  });
  test('Retorna array con la validaciíon de los links y propiedades', async() =>{
    expect(await index.mdLinks(documentMd,'--validate')).toStrictEqual(resolveMdlinks);
  })
  test('Retorna un contador con links ', async() =>{
    expect(await app.validateLinks(directory,'--validate')).toStrictEqual(['readme2.md']);
  })

})
