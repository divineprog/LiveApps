/*require('dns').lookup(require('os').hostname(),
  function (err, add, fam)
  {
    console.log('err: ' + err)
    console.log('add: ' + add)
    console.log('fam: ' + fam)
  })
*/
var os = require('os');
var interfaces = os.networkInterfaces();
for(name in interfaces) {
 console.log(name)
 var interface = interfaces[name];
 interface.forEach(function(entry) {
   console.log("  " + entry.address)
   if(entry.family === "IPv4") {
     //var s = net.createServer(connectionHandler);
     //s.listen(80, entry.address);
     console.log("  listening on " + entry.address);
   }
 });
}
