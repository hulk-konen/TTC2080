// use express
const express = require('express') 

// create express app
const app = express()

// define port
const port = 3000

app.use(express.json())

// define endpoint
app.get('/', (request, response) => {
  response.send('Hello from server side!')
})

// define some data as a JSON format
let testPerson = {'name':'Kirsi Kernel'}

app.get('/person', (request, response) => {
  response.json(testPerson)
})

app.post('/person', (request, response) => {
    // get request body with JSON
    const body = request.body
    console.log(body.name)
    console.log(body.age)
    console.log(body.email)
    response.send('POST HTTP received!')
})

// start web-server and listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})