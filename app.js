var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var exSession=require('express-session');

var login=require('./controllers/Login');
//var logout=require('./Controller/Logout');
var admin=require('./controllers/AdminController/home');
var employee=require('./controllers/EmployeeController/home');
//var registration=require('./Controller/Registration');

app.set('view engine','ejs');
app.use('/path', express.static('JS'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'Lab_Exam', saveUninitialized: true, resave: false}));

app.use('/',login);
app.use('/login',login);
app.use('/Admin',admin);
app.use('/Employee',employee);
//app.use('/logout',logout);

var port=process.env.PORT || 3333;
app.listen(port,function(){
  console.log('port is open in 3333');
})
