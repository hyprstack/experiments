var http = require('http');
var server = http.createServer();


server.on('request', function(request, response){
    console.log("Request received!");
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Hello World!");
    response.end();
  }
);
server.listen(8080);
console.log("Server started!");
