// esto está basado en la siguiente web:
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// que explicael proceso de una petición HTTP a un servidor con Node.js
// revisar pq no consigo respuesta


const http = require('http');

//request handler
http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    // This prints the error message and stack trace
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    // `body` has the entire request body stored in it as a string

    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
        console.error(err);
      });
  
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})
  
      const responseBody = { headers, method, url, body };
  
      response.write(JSON.stringify(responseBody));
      response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))
  
      // END OF NEW STUFF
    
  });
}).listen(8080, () => console.log('servidor levantado escuchando en puerto 8080!')); // Activates this server, listening on port 8080.