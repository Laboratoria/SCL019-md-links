
const {verifyExistence,verifyExtension,fileExistence,readMd  }= require('../inicio.js');
const {linksStatus,stats, validate } =require('../validate_stats.js');
const ruta = 'C :/Norma/Laboratoria/Laboratoria 19/SCL019-md-links/README.md'
const file ='./README.md'
const file1 ='./texto1.txt'





describe('La funcion verifica la existencia', () => {
   
  it('Si el archivo existe y devuelve true ', () => { 
  
   expect(verifyExistence(file)).toBe(true)
  });
  it('Si el archivo no existe y devuelve false' , () => {
 
        expect(verifyExistence(file1)).toBe(false)
    });
});

describe('La función verifyExtension', () => {

    it('verifica la extensión del archivo. Si es md. Devuelve true', () => {
      expect(verifyExtension(ruta)).toBe(true);
    });
   
    it('verifica la extensión del archivo. Si no es .md devuelve false', () => {
       expect(verifyExtension(file1)).toBe(false);
    });
  });
  
  describe('La función fileExistence', () => {

    it('verifica si el archivo existe, devuelve true', () => {
      expect(fileExistence(file)).toBe(true);
    });
   
     });



  //funcion
  describe('linksStatus', () => {

    it('should be a function', () => {
      expect(typeof linksStatus).toBe('function');
      console.log('it is a function');
    });
  })


  describe('stats', () => {

    it('should be a function', () => {
      expect(typeof stats).toBe('function');
      console.log('it is a function');
    });
  })


  describe('validate', () => {

    it('should be a function', () => {
      expect(typeof validate).toBe('function');
      console.log('it is a function');
    });
  })

  describe('readMd', () => {

    it('should be a function', () => {
      expect(typeof readMd ).toBe('function');
      console.log('it is a function');
    });
  })


