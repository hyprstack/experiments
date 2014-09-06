/* In this experiment I want to export the functionality of a module into my node program and output the result to a http server. The module will
take a single argument "r" and calculate the circumfrence and area of a circle. The value of "r" will be defined in the URL as req.params and
the final value printed to the browser page. I will write both servers, one using pure Node and another using the Hapi framework. This will
allow us to compare simplicity/complexity of the code.
*/


// A HTTP server using pure nodeJs

var http = require('http');
var t = require('./modules/myModule.js');
var url = require('url');

var server = http.createServer();

server.on('request', function(request, response){
  console.log("Request received!");
  response.writeHead(200, {"Content-type": "text/plain"});
  response.end();
});

server.listen(8080);




// Using hapiJs

var Hapi = require('hapi');
var t = require('./modules/myModule.js');

var server = Hapi.createServer('localhost', 8080);

var routes = [
  {
    path: '/circ/{value}',
    method: 'GET',
    handler: function(req, reply){
      console.log("Circumfrence: " + t.circumfrence(req.params.value));
      reply("The value of the circumfrence is " + t.circumfrence(req.params.value));
    }
  },
  {
    path: '/area/{value}',
    method: 'GET',
    handler: function(req, reply){
      console.log('Area: ' + t.area(req.params.value));
      reply('The value of the area is '+ t.area(req.params.value));
    }
  }
];

server.route(routes);

server.start(function(){
  console.log("Server info " + server.info.uri);
});
