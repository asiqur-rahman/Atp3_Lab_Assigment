var express = require('express');
var router = express.Router();
var userModel 	= require.main.require('./models/AdminModel/user');
const { body, validationResult } = require('express-validator');

router.get('/',function(req,res){
  if(req.session.usertype=="employee"){
  res.render('employee',{
    title:'Employee | Home'
  });
}
else{
  res.redirect('/Login');
}
});

router.get('/AllProducts',function(req,res){
  if(req.session.username!=null){
var thead=['Name','Quantity','Price','Action','Action'];
var linkName=['Update','Delete'];
var link=['/Employee/Update?id=','/Employee/Delete?id='];
var data=[];
  userModel.getAllPro(function(result){
    console.log(result);
    for(var i=0; i<result.length; i++){
      data.push([result[i].name,result[i].quantity,result[i].price,result[i].id]);
    }
    //console.log(data);
    res.render('list',{
      msg:"All Product Information",
      hdata:thead,
      rows:data,
      linkName:linkName,
      links:link,
      link:'/Employee'
    });
	});
}
else{
  res.redirect('/Login');
}
});

router.post('/AllProducts',function(req,res){
  //console.log("called");
  if(req.session.username!=null){
var id=req.query.id;
var label=['Name','Quantity','Price'];
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

router.get('/AddProduct',function(req,res){
  if(req.session.username!=null){
var id=req.query.id;
var label=['Name','Quantity','Price'];
    var data=[];
      //console.log(data);
      res.render('edit',{
        msg:"",
        label:label,
        data:data
      });
  }
  else{
    res.redirect('/Login');
  }
});

router.post('/AddProduct',
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
  var product={
    name:req.body.num0,
    quantity:req.body.num1,
    price:req.body.num2
  }

  //console.log(user);
  userModel.addProduct(product,function(result){
    if(result){
      res.redirect('/Employee/AllProducts');
      }
});
}
});


router.get('/Update',function(req,res){
  if(req.session.usertype=="employee"){
var id=req.session.userId;
var label=['Name','Quantity','Price'];
    var data=[];
    userModel.getEmpById(id,function(result){
        data.push(result.name);
        data.push(result.quantity);
        data.push(result.price);
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
var label=['Name','Quantity','Price'];

data.push(req.body.name);
data.push(req.body.quantity);
data.push(req.body.price);
data.push(req.body.id);

var user={
  name:req.body.num0,
  quantity:req.body.num1,
  price:req.body.num2,
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
    userModel.productDelete(id,function(result){
      res.redirect('/Employee/AllProducts');
    });
}
else{
  res.redirect('/Login');
}
});

router.get('/Search',function(req,res){
if(req.session.username!=null){
    //var id=req.query.id;
    console.log(req);
}
else{
  res.redirect('/Login');
}
});
module.exports = router;
