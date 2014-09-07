/* In this experiment I want to export the functionality of a module into my node program and output the result to a http server. The module will
take a single argument "r" and calculate the circumfrence and area of a circle. The value of "r" will be defined in the URL as req.params and
the final value printed to the browser page. I will write both servers, one using pure Node and another using the Hapi framework. This will
allow us to compare simplicity/complexity of the code.
*/


// A HTTP server using pure nodeJs

var http = require('http');
var t = require('./modules/myModule.js');


var server = http.createServer();


server.on("request", function(request, response){
    console.log("Request received!");
    console.log(request.url + " ------- " + typeof(request.url));
    var myPath = request.url.split('/');
    console.log(myPath);
    console.log(myPath[1] + "------" + myPath[2]);

      if(myPath[1] === 'circ'){
        response.writeHead (200, {"Content-type": "text/plain"});
        response.write("The value of the circumfrence is " + t.circumference(myPath[2]));
      }
      if(myPath[1] === 'area'){
        response.writeHead (200, {"Content-type": "text/plain"});
        response.write("The value of the area is " + t.area(myPath[2]));
      }

    response.end();
  }
);

server.listen(8080);
console.log("Server running on port 8080");




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


/*
Although the amount of code is similar, the simplicity of logic behind hapi is greater. When using the pure node approach
I had to parse the request url myself and split it into an array and then set conditions. This would become cumbersome for a
full blown project with a few hundred urls. I was giving an extra solution to the pure node approach, but again this is limited to
a single url. If you are interested go to: http://stackoverflow.com/questions/25711324/setting-routes-in-node/25711860?noredirect=1#comment40197195_25711860
I am sure there are other ways to do it, but this was the simplest way I found at the time, and without copying any solutions.
*/
