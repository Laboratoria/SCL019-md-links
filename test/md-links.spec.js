const app = require('../app.js');
const document1 = 'probando.md';
const document2 = 'prueba.js';
// test para ver si termina en .md
describe('pathExtension', () => {

  it('should be true if it is an .md', () => {
    console.log(document1);
    expect(app.pathExtension(document1)).toBe(true);
  });
  it('should be false if it is not an .md', () => {
    console.log(document2);
    expect(app.pathExtension(document2)).toBe(false);
  });
});
//PAra vern si la ruta es absoluta
const ruta1 = 'C:\\Users\\lidia\\OneDrive\\Documentos\\Proyecto md-link\\SCL019-md-links\\pruebas de ruta\\probando.md';
const ruta2 = 'pruebas de ruta\\probando.md';
describe('pathAbsolute', () => {

  it('should be true if it is absolute', () => {
    console.log(ruta1);
    expect(app.pathAbsolute(ruta1)).toBe(true);
  });
  it('should be false if it is not absolute', () => {
    console.log(ruta2);
    expect(app.pathAbsolute(ruta2)).toBe(false);
  });
});

//testeando la convecciòn a absoluta
const ruta3 = 'C:\\Users\\lidia\\OneDrive\\Documentos\\Proyecto md-link\\SCL019-md-links\\pruebas de ruta\\prueba.js';
const ruta4 ='pruebas de ruta\\prueba.js';
describe('converToAbsolute', () => {

  it('should return ruta1 absoluta', () => {
    console.log(ruta2);
    expect(app.converToAbsolute(ruta2)).toBe(ruta1);
  });
  
  it('should return ruta3 absoluta', () => {
    console.log(ruta3);
    expect(app.converToAbsolute(ruta4)).toBe(ruta3);
  });
 
});

//testear si es un archivo
const file = 'C:\\Users\\lidia\\OneDrive\\Documentos\\Proyecto md-link\\SCL019-md-links\\pruebas de ruta\\prueba.js';
const carpet = 'C:\\Users\\lidia\\OneDrive\\Documentos\\Proyecto md-link\\SCL019-md-links\\pruebas de ruta';
describe('isFile', () => {

  it('should be true if it is a file', () => {
    console.log(file);
    expect(app.isFile(file)).toBe(true);
  });
  
  it('should be false ifit is not a file ', () => {
    console.log(carpet);
    expect(app.isFile(carpet)).toBe(false);
  });
 
});

//testeando si existe en el computador
const noExist = 'C:\\Mein\\lidia\\OneDrive\\Documentos\\Proyecto\\SCL019-s\\pruebas de ruta';
describe('probando la funcion verifyAccess para verificar si el archivo existe', () => {

  it('deberia validar si el archivo exite', () => {
    const result = app.verifyAcces(file);

    expect(result).toBeTruthy();
  });
  it('deberia indicar que no existe', () => {
    const result = app.verifyAcces(noExist);

    expect(result).toBeTruthy();
  });
});
//testear leer lineas
describe('readLines', () => {

  it('should return los links', () => {
    console.log(ruta1);
    expect(app.readLines(ruta1)).toBe(ruta1);
  });
  
  it('no deberia retornar links', () => {
    console.log(ruta3);
    expect(app.readLines(ruta4)).toBe(ruta3);
  });
 
});