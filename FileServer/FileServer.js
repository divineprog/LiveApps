var HTTP = require('http')
var URL = require('url')
var NET = require('net')
var FS = require('fs')
var OS = require('os')
var PATH = require('path')

var BaseDirectory = '/HackathonDemos/BasicWebUI/LocalFiles'

//var data = FS.readFileSync('/HackathonDemos/BasicWebUI/LocalFiles/index.html')
//console.log(data)

function HandleRequest(request, response)
{
  //request.setEncoding('utf8')
  var path = unescape(URL.parse(request.url).pathname)
  ServeFile(path, response)
}

function ServeFile(path, response)
{
  var file = GetFileStatus(BaseDirectory + path)
  if (!file)
  {
    FileNotFoundResponse(path, response)
    return
  }
  
  if (file.isDirectory())
  {
    // Get default page 'index.html'.
    // Add ending slash separator if not present.
    if ('/' != path.charAt(path.length - 1))
    {
      path = path + '/'
    }
    path = path + 'index.html'
    var indexFile = GetFileStatus(BaseDirectory + path)
    if (!indexFile)
    {
      FileNotFoundResponse(path, response)
      return
    }
  }
  else
  if (!file.isFile())
  {
    FileNotFoundResponse(path, response)
    return
  }
  
  // Write file data to reponse object.
  WriteFileResponse(BaseDirectory + path, response)
}

// TODO: Add support for image/media/binary files.
function WriteFileResponse(fullPath, response)
{
  var contentType = GetContentType(fullPath)
  var data = FS.readFileSync(fullPath)
  response.writeHead(200, 
  {
    'Content-Length': data.length,
    'Content-type': contentType,
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Expires': '-1'
  });
  response.write(data)
  response.end()
}

function FileNotFoundResponse(path, response)
{
  response.writeHead(404)
  response.end('File Not Found: ' + path)
}

function GetFileStatus(fullPath)
{
  try
  {
    return FS.statSync(fullPath)
  }
  catch (ex)
  {
    console.log('GetFileStatus exception: ' + ex)
    return null
  }
}

function GetContentType(path)
{
  // TODO: Add image/media types.
  var mappings = { 
    '.css': 'text/css',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'application/javascript'
  }
  var pathLower = path.toLowerCase()
  var index = pathLower.lastIndexOf('.')
  var extension = pathLower.slice(index)
  var contentType = mappings[extension]
  if (contentType)
  {
    return contentType
  }
  else
  {
    return 'text/plain'
  }
}

function WriteResponse(response, data)
{
  response.writeHead(200,
  {
    'Content-Length': data.length,
    'Content-Type': 'html',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Expires': '-1'
  })
  response.write(data)
  response.end()
}

var server = HTTP.createServer(HandleRequest)
server.listen(4042)

console.log('Server running at http://127.0.0.1:4042/')
