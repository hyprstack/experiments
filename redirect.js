var http = require('http');

var server = http.createServer(function(req, res){
  var url = 'http://google.com'; //the url we will be redirecting to!
  var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>';
  console.log(body);
  
  res.setHeader('Location', url);
  res.setHeader('Content-length', body.length);
  res.setHeader('Content-type', 'text/html');
  res.statusCode = 302;
  res.end(body);
});

server.listen(8000);
console.log("Server started on 8000");
