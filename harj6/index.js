const { response, json } = require('express')
const express = require('express') 
const { request } = require('http')
const app = express()
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended: true} ))
const port = 3000

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

let users = 
[
  { 'id':'1', 'name':'Kirsi Kernel' },
  { 'id':'2', 'name':'Matti Mainio' }
];


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

app.get('/list', (request, response, next) => {
  
  let result = '<a href="/list">List users</a> | <a href="/add">Add user</a><table>  <thead><tr><td><b>ID</b></td><td><b>Nimi</b></td></tr></thead>';
  for (let user in users) {
    result += "<tr><td>" + users[user].id + "</td><td>" + users[user].name + "</td></tr>";
  }
  result += '</table>';

  response.send(result);
  }

)

 //get all users
 app.get('/users', (request, response) => {
    response.json(users)
 })

//app.get('/users', (request, response, next) => {
  // route level middleware
  //console.log(new Date().toISOString())
  // call next function (line 7)
  //next()
//},
//(request, response) => {
  //response.json(users)
//}
//)


// get one user
app.get('/users/:id', (request, response) => {
  // const id = request.params.id
  const { id } = request.params
  const user = users.find(user => user.id === id)
  // check if user exists or return 404
  if (user) response.json(user)
  else response.status(404).end()
})

// delete one user
app.delete('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params
  users = users.filter(user => user.id !== id)
  // Just send "204 no content" status code back
  response.status(204).end()
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
app.post('/users/', (request, response) => {
  const maxId = Math.max(...users.map(user => user.id), 0)
  const user = request.body
  user.id = (maxId+1).toString()
  user.name = request.body.nimi 
  users = users.concat(user) 
  response.redirect('/list');
})


app.listen(port, () => {
  console.log('Example app listening on port 3000')
})

