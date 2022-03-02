const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000
const counterfile = './counter.txt'

const server = http.createServer((req, res) => {


fs.readFile(counterfile, (error, data) => {
  if (error) {
    res.statusCode = 500
    res.end()
  } else { 
    let counter = parseInt(data) + 1

    fs.writeFile(counterfile, counter+'', (error, data) => {
      if (error) {
        res.statusCode = 500
        res.end()
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.write('Request counter value is ' + counter)
        res.end()
      }
   })
  }
  })

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})