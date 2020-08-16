var express = require('express');
var router = express.Router();
var userModel 	= require.main.require('./models/AdminModel/user');
const { body, validationResult } = require('express-validator');

router.get('/',function(req,res){
  if(req.session.username!=null){
  res.render('home',{
    title:'Admin | Home',
    link:'/Admin'
  });
}
else{
  res.render('account',{
    title:'login',
    error:"Invalid Informations !"
  });
}
});

router.get('/AllEmpList',function(req,res){
  if(req.session.username!=null){
var thead=['Name','Phone','UserName','Password','Action','Action'];
var linkName=['Update','Delete'];
var link=['/Admin/Update?id=','/Admin/Delete?id='];
var data=[];
  userModel.getAllEmp(function(result){
    console.log(result);
    for(var i=0; i<result.length; i++){
      data.push([result[i].name,result[i].contact,result[i].username,result[i].password,result[i].id]);
    }
    //console.log(data);
    res.render('list',{
      msg:"All Employee Information",
      hdata:thead,
      rows:data,
      linkName:linkName,
      links:link,
      link:'/Admin'
    });
	});
}
else{
  res.redirect('/Login');
}
});

router.post('/AllEmpList',function(req,res){
  console.log("called");
  if(req.session.username!=null){
var id=req.query.id;
var label=['Name','Phone','Username','Password'];
    var data=[];
      res.render('edit',{
        msg:"",
        label:label,
        data:data,
        link:'/Admin'
      });
  }
  else{
    res.redirect('/Login');
  }
});

router.get('/RegEmployee',function(req,res){
  if(req.session.username!=null){
var id=req.query.id;
var label=['Name','Phone','Username','Password'];
    var data=[];

      //console.log(data);
      res.render('edit',{
        msg:"",
        label:label,
        data:data
      });
//   if(req.session.username!=null){
// var id=req.query.id;
// var label=['Name','Phone','Username','Password'];
//     var data=[];
//       res.render('edit',{
//         msg:"",
//         errors:[],
//         label:label,
//         data:data,
//         link:'/Admin'
//       });
  }
  else{
    res.redirect('/Login');
  }
});

router.post('/RegEmployee',
// [
//   body('num0').not().isEmpty().withMessage("Name Can't be empty"),
//   body('num1', 'Phone -> Phone must have 11 digit').not().isEmpty().isLength({ min: 8 ,max: 8}),
//   body('num4', 'Username -> Min length is 8').not().isEmpty().isLength({ min: 8 }),
//   body('num5', 'Password -> Min length is 8').not().isEmpty().isLength({ min: 8 })
// ],
function(req,res){
const errors = validationResult(req);
if (!errors.isEmpty()) {
  // console.log(errors.array());
  // var label=['Name','Phone','Gender','Designation','Username','Password'];
  //     var data=[];
  //       res.render('edit',{
  //         msg:"",
  //         errors:errors.array(),
  //         label:label,
  //         data:data,
  //         link:'/Admin'
  //       });
    return res.status(422).jsonp(errors.array());
  }
  else{
  var id=req.query.id;
  var user={
    name:req.body.num0,
    contact:req.body.num1,
    username:req.body.num2,
    password:req.body.num3
  }

  //console.log(user);
  userModel.addUser(user,function(result){
    if(result){
      res.redirect('/Admin/AllEmpList');
      }
});
}
});

router.get('/Update',function(req,res){
  if(req.session.username!=null){
var id=req.query.id;
var label=['Name','Phone','Username','Password'];
    var data=[];
    userModel.getEmpById(id,function(result){
        data.push(result.name);
        data.push(result.contact);
        data.push(result.username);
        data.push(result.password);
        data.push(result.id);
      //console.log(data);
      res.render('edit',{
        msg:"",
        label:label,
        data:data
      });
  	});
}
else{
  res.redirect('/Login');
}
});

router.post('/Update',function(req,res){
var id=req.query.id;
var data=[];
var label=['Name','Phone','Username','Password'];

data.push(req.body.fullname);
data.push(req.body.contact);
data.push(req.body.username);
data.push(req.body.password);
data.push(req.body.id);

var user={
  name:req.body.num0,
  contact:req.body.num1,
  username:req.body.num2,
  password:req.body.num3,
  id:id
}
// console.log(user);
userModel.userUpdate(user,function(result){
    res.redirect('/Admin/AllEmpList');
  });
//goAgain("Username Min Length 8 !");

//console.log(data);
// function goAgain(msg) {
//   res.render('edit',{
//     msg:msg,
//     label:label,
//     data:data
//     });
// }
});

router.get('/Delete',function(req,res){
if(req.session.username!=null){
    var id=req.query.id;
    userModel.userDelete(id,function(result){
      res.redirect('/Admin/AllEmpList');
    });
}
else{
  res.redirect('/Login');
}
});

router.get('/Search',function(req,res){
  if(req.session.username!=null){
  res.render('search');
  }
  else{
  res.render('account',{
    title:'login',
    error:"Invalid Informations !"
  });
  }
});

router.get('/SearchKey',function(req,res){
  var data=[];
  console.log("called :");
  var name=req.query.key;
  console.log(name);
  userModel.empSearch(name,function(rows){
  for(i=0;i<rows.length;i++)
    {
      data.push(rows[i].name);
    }
    res.end(JSON.stringify(data));
});
});
module.exports = router;
