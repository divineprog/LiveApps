
var net = require('net');

// File upload server test code.

var server = net.createServer(function(socket)
{
	console.log('Socket connected');
	
	socket.on('end', function()
	{
		console.log('Socket disconnected');
	});
	
	socket.on('data', function(data)
	{
		var s = data.toString()
		var i = s.indexOf("image/png");
		s = s.substr(0, i + 10);
		console.log('@@@server data:\n' + s);
		console.log('@@@@@@@@@@@@@@@\n');
		socket.write('HTTP/1.1 200 OK\r\n');
		socket.write('Content-Type: text/plain\r\n');
		socket.write('\r\n');
		socket.write('Hello World');
		socket.end();
	});
});

server.listen(4044, function()
{
	/**
	 * Get the public IP-address for the machine.
	 * @param fun Function f(error, address, family)
	 * Thanks to nodyou: http://stackoverflow.com/a/8440736/1285614
	 */
	function GetIP(fun)
	{
		var DNS = require('dns');
		var OS = require('os');
		DNS.lookup(OS.hostname(), fun);
	}

	console.log('Server started');
	GetIP(function (err, add, fam)
	{
		console.log('http://' + add + ':4044/');
	});
});
