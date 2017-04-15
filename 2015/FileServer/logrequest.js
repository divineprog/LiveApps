
var HTTP = require('http')
var URL = require('url')
var NET = require('net')
var FS = require('fs')
var OS = require('os')
var PATH = require('path')
var DNS = require('dns')

function server(socket)
{
	try
	{
		socket.on('close', function (had_error)
		{
			console.log(
				"Client " +
				address + " (" +
				socket.deviceInfo.name +
				") has disconnected.");
		});

		socket.on('data', function(data)
		{
			console.log(data);
			
		});
	}
	catch(err)
	{
		console.log("Error in saveClient: " + err);
	}
}

// Main handler for file requests (web server).
function HandleFileRequest(request, response)
{
  //request.setEncoding('utf8')
  var path = unescape(URL.parse(request.url).pathname)
  
  
  response.writeHead(200, {})
  response.write("Hello")
  response.end()
}

/**
 * Get the public IP-address for the machine.
 * @param fun Function f(error, address, family)
 * Thanks to nodyou: http://stackoverflow.com/a/8440736/1285614
 */
function GetIP(fun)
{
  DNS.lookup(OS.hostname(), fun)
}

// Create and start the HTTP file server.
var server = HTTP.createServer(HandleFileRequest)
server.listen(4041)
GetIP(function (err, add, fam) {
  console.log('File server running at http://' + add + ':4041/')
})
