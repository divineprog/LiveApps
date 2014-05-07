var HTTP = require('http')
var URL = require('url')
var NET = require('net')
var FS = require('fs')
var OS = require('os')
var PATH = require('path')
var DNS = require('dns')
var CHILD_PROCESS = require('child_process')

var Port = 4048

var HandleRequest = function(request, response)
{
	var path = unescape(URL.parse(request.url).pathname)
	console.log('HandleRequest url: ' + request.url)
	console.log('HandleRequest path: ' + path)

	if (path == '/favicon.ico')
	{
		response.writeHead(200, {'Content-Type': 'image/x-icon'})
		response.end()
		return
	}

	var index = path.indexOf('/exec/')
	if (index < 0)
	{
        WriteData(response, 'Illegal Request')
        return
	}

	var command = path.slice(index + 6)
    DoCommand(command, function(result)
    {
        WriteData(response, result.toString())
    })
}

var DoCommand = function(command, callback)
{
	CHILD_PROCESS.exec(command, function(error, stdout, stderr)
	{
		if (error)
		{
			callback(stderr)
		}
		else
		{
			callback(stdout)
		}
	})
}

var WriteData = function(response, data)
{
	response.writeHead(
		200,
		{
			'Content-Length': data.length,
			'Content-type': 'text/plain',
			'Access-Control-Allow-Origin': '*',
			'Pragma': 'no-cache',
			'Cache-Control': 'no-cache',
			'Expires': '-1'
		}
	)
	response.write(data)
	response.end()
}

// Start the server.
Server = HTTP.createServer(HandleRequest)
Server.listen(Port)

// This method for getting the IP-address does not always work.
// There are more reliable but also more complicated methods available.
function GetIP(fun)
{
  DNS.lookup(OS.hostname(), fun)
}

// Display the server address.
GetIP(function (err, addr, fam)
{
    console.log('Server running at http://' + addr + ':' + Port)
})
