const mdLinks = require('../md-links.js');
const index = require('../index.js');
const { TestWatcher } = require('jest');


const mdFile = 'link-test.md'
const txtFile = 'test.txt'
const validDirectory = './'
const noFilesDirectory = './test'
const invalidpath = 'ghost.md'

const options = {}
/*escribe('Función verifyExitence', () => {

  it('should check if the file or directory exists', () => {
    expect(index.verifyExistance('readme.md')).toBe(true)
  });

});*/

test('mdLink function', () => {
  return mdLinks(mdFile, options.stats).then(data => {
    expect(data).toBe('peanut butter');
  });
});
