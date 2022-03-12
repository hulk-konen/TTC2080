const express = require('express') 
const app = express()
const port = 3000

app.get('/hello', (request, response) => {
  response.send('Hello Express!')
})

app.listen(port, () => {
  console.log('Example app listening on port 3000')
})