var protocol=require("http");
protocol.createServer(function (request, response)
{

    response.writeHead(200, {'Content-type':'text/html'});
    response.end('Hello there!');
}

).listen(8000);