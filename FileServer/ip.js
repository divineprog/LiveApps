require('dns').lookup(require('os').hostname(),
  function (err, add, fam)
  {
    console.log('err: ' + err)
    console.log('add: ' + add)
    console.log('fam: ' + fam)
  })
