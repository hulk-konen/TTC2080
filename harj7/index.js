const { response, json } = require('express')
const express = require('express') 
const { request } = require('http')
const app = express()
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended: true} ))
const port = 3000

// use mongoose
const mongoose = require('mongoose')

// connection string - EDIT YOUR OWN HERE
const mongoDB = 'mongodb+srv://tommi:5qi&UCVL3n^byWRV@cluster0.t9svg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// connect mongodb
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

// check connection - ok or error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

// new schema
const userSchema = new mongoose.Schema({
  name: String
})

// new model
const User = mongoose.model('User', userSchema, 'users')


// create logger
const logger = (request, response, next) => {
  const date = new Date()
  const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  const log = `${lDate}: ${request.method} ${request.url}\n`
  console.log(log)

  const fs = require('fs');
  fs.appendFile("loki.txt", log, function(err) {
    if(err) {
        return console.log(error);
    }

    console.log("The file was saved!");
}); 

  next()
}

// use own made logger middleware in express app
app.use(logger)

app.get('/add', (request, response) => {
  htmlform = `
<a href="/list">List users</a> | 
<a href="/add">Add user</a>

<form action=/users method=post>
Add a new user: <input type=text name=nimi><br>
<input type=submit value="add user">
</form>
`;
  response.send(htmlform)
})

app.get('/list', async (request, response, next) => {
  const users = await User.find({})
  let result = '<a href="/list">List users</a> | <a href="/add">Add user</a><table>  <thead><tr><td><b>ID</b></td><td><b>Nimi</b></td></tr></thead>';
  for (let user in users) {
    result += "<tr><td>" + users[user].id + "</td><td>" + users[user].name + "</td></tr>";
  }
  result += '</table>';

  response.send(result);
  }

)
//en käytä tätä
// get all users
//app.get('/users', async (request, response) => {
//  const users = await User.find({})
//  response.json(users)
//})

// get one user
app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) response.json(user)
  else response.status(404).end()
})

// delete one user
app.delete('/users/:id', async (request, response) => {
  const deletedUser = await User.findByIdAndRemove(request.params.id)
  if (deletedUser) response.json(deletedUser)
  else response.status(404).end()
})

// update user data
app.put('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params
  // const name = request.query.name
  const { name } = request.query
  const user = users.find(user => user.id === id)
  if (user) {
    user.name = name
    response.status(200).end()
  } else {
    response.status(204).end()
  }
})

// create a new user
app.post('/users', async (request, response) => {



  //const maxId = Math.max(...users.map(user => user.id), 0)
  //const user = request.body
  //user.id = (maxId+1).toString()
  //user.name = request.body.nimi 
  //users = users.concat(user) 
  // Get name from request
  const name = request.body.nimi
  console.log(name)
  // Create a new user
  const user = new User({
    name: name
  })

  // Save to db and send back to caller
  const savedUser = await user.save()
  //response.json(savedUser)  
  response.redirect('/list');

})




app.listen(port, () => {
  console.log('Example app listening on port 3000')
})

