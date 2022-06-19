const colors =require('colors')

const https = require('https');
const url = require('url');

//codigo de respuesta de los links
const linksStatus = (link) => {
    return new Promise ((resolve) => {
     //opciones, con propiedades para mi solicitud  https
    const options={
       //
        method:'GET',
        // es todo lo que hay despues del host, devuelve un objeto de url
        //el método url.parse() toma una cadena de URL, la analiza y devuelve un objeto de URL.
        path: url.parse(link).pathname,
        //puerto con conexiones seguras
        port:443,
        //el host es la url del link
        hostname:url.parse(link).host, // ruta donde va la peticion
        
    };
       
     // metodo https , parametro opciones, y funcion callback response (respuesta)
     //hacer un peticion a un servidor web seguro
    const req = https.request(options, response => {
        //Cuando la ejecucion termina que pase esto que viene
        const newData ={
        nameLink:link,
        href:link,
        //responde codigo de respuesta
        Code: response.statusCode,
      //estado ok 
        status:`ok ${response.statusCode}`
        };
    
    //resuelve la promesa, se refiere al valor al cual resuelve
    resolve(newData);
    
    });
    // cuando alla un error, quiero que se active el evento 
    req.on('error', err =>{
       //console.error('que tal' + err)
        const errorData={
            nameLink:link,
            status:false,
        };
        resolve(errorData);
        });
    // una vez que lance la solicitud quiero que la cierre
    req.end()
                       
    });
    
    } 
    
//estadistica
    function stats (arrayLinks) {
     
      let validateLinks = 0; // se tiene que colocar let, porque no es constante
      let invalidateLinks = 0; // 
     // nuevo set .. map se crea un nuevo array con el resultado de la funcion callback 
      let unique= new Set(arrayLinks.map(link =>link.href == link.nameLink));
     
    
      //recorro todo el objeto arrayLinks
         arrayLinks.forEach(element => {
  //si el estado del elemento valido, suma +1
          if (element.status){
            validateLinks += 1;
            //si es invalido suma +1
          }else{
              invalidateLinks += 1;
          }
          
      });
      process.stdout.write(colors.rainbow('TOTAL :' +  arrayLinks.length +'\n'))
      process.stdout.write(colors.red('UNIQUE :' + (unique.size)+ '\n'))
      process.stdout.write(colors.blue('VALIDOS:' , validateLinks ,'\n' ))
      process.stdout.write(colors.rainbow('BROKEN:' +  invalidateLinks +'\n' ))  
          }
        
      
      //valido
    function validate (arrayLinks) {
        
        //recorro todo el objeto arrayLinks
        arrayLinks.forEach(element => {
            if (element.status ){
                process.stdout.write(colors.green(`Link: ${element.nameLink} Status: ${element.status}  \n`))
        
        
            }else{
               process.stdout.write(colors.red(`Link: ${element.nameLink} Status: ${element.status} \n`)) 
               
            }
        });
    } 
 
exports.linksStatus = linksStatus;
exports.stats =stats;
exports.validate = validate
