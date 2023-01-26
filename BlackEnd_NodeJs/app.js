//รันใช้ nodemon app.js
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
//bodyParser เป็นlibarly  ทำให้มีการจักการ body ที่มีการฝั่งข้อมูลมากับเส้น reqest
var jsonParser = bodyParser.json()
//bcryptทำการเข้ารหรัสเพื่อความปลอดภัย
const bcrypt = require('bcrypt')
const saltRounds = 10
//jwt สร้างToken
var jwt = require('jsonwebtoken')
const secret ='react-jsonwebtoken'

app.use(cors())


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //เข้าถึง database SQL ที่ชื่อ test
  database: 'test' 
});

// post คือการส่ง parameter ทำเป็น json เข้าไป และส่ต่อให้ API ไปประมวณผลต่อ
//เรียกใช้ jsonParser โดยใส่หลัง API
app.post('/register',jsonParser, function (req, res, next) {
   // var email = req.body.email เป็นการดึง email ใน body ออกมา 
   // res คือการส่งข้อมูลมาแสดงผล

      //ทำการเข้ารหรัสเพื่อความปลอดภัย hash password ออกมาแล้วบันทึกใน req.body.password 
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        //req.body.password จะได้เป็น hash แล้วเอา hash ไปใส่ connection.execute 

        //connection.execute ส่งค่าเข้าไปในการ query
        connection.execute(
          //INSERT INTO userstest ส่งตัวไปแปรไป email, password, name
          'INSERT INTO userstest (email, password, name) VALUES (?, ?, ?)',
          [req.body.email,hash,req.body.name],
          function(err, results, fields) {
           if (err) {
            res.json({status: 'error',message: err})
            return
           }
           //ส่งสำเร็จ status : success ok
            res.json({status: 'success ok'})
          }
        );
    });
   
 
})

app.post('/login',jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM userstest WHERE email=?',
    [req.body.email],
    function(err, users, fields) {
     if (err) {res.json({status: 'error',message: err});return}
     if (users.length == 0) {res.json({status: 'error',message: "no user found"});return}
      //ใช้ เทีบบค่า token ของ req.body.passwordฝั่งที่ไม่ได้เข้ารหัส กับ users[0].passwordฝั่งตัวในฐานข้อมูล
      bcrypt.compare(req.body.password, users[0].password, function(err, islogin) {
        if(islogin) {
          //สร้างtoken เมื่อlogin มาแล้ว และหมดอายุ 6 ซม
          var token = jwt.sign({ email:users[0].email }, secret,{ expiresIn: '6h' });
          res.json({status:'ok',message:'Login Success',token})
        } else {
          res.json({status:'Error',message:'Login Failed'})
        }
    });
    }
  );
})

app.post('/authen',jsonParser, function (req, res, next) {
  //try เช็ค
 try{
  //เข้าถึงเฉพาะtoken
  const token = req.headers.authorization.split(' ')[1]
  //verifyตัวjwtถูกต้องหรือป่าว
  var decode = jwt.verify(token, secret)
  res.json({status:'OK',decode})
 } catch(err){
  res.json({status:'Error',decode}) 
 }
})
app.listen(3333, jsonParser ,function () {
  console.log('CORS-enabled web server listening on port 33')
})