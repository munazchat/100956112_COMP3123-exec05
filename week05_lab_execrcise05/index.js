const express = require('express');
const path = require('path')
const fs = require('fs');
const app = express();
const router = express.Router();
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile( path.join(__dirname + '/home.html'))
})
/*
- Return all details from user.json file to client as JSON format
*/
let userFile = path.join(__dirname,'user.json')
router.get('/profile', (req,res) => {
      let readable = fs.createReadStream(userFile)
      readable.pipe(res)});
/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
     let data = require('./user.json')
     let username = req.query.username
     let password = req.query.password
  if(username == data.username && password == data.password){
    a = {
         status:true,
         message:"User valid"
    }
        res.send(a)
  }if(username != data.username && password == data.password){
    a = {
    status:false,
      message: "user name is invalid"
    }
   res.send(a)
  }
  if(username == data.username && password != data.password){
    a = {
          status: false,
         message: "password in wrong"
    }
    res.send(a)
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let username = req.params.username
  res.send(`<b>${username} logout success</b>`)
});
app.use('/', router);
app.listen(process.env.port || 8080);
console.log('web server listening '+ (process.env.port || 8080));