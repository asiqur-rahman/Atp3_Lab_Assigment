var db = require.main.require('./models/database/database');

module.exports ={

	get: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAllEmp: function(callback){
		var sql = "select * from employee";
		console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getAllPro: function(callback){
		var sql = "select * from product";
		console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getEmpById: function(id,callback){
		var sql = "select * from employee where id="+id;
		//console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				//console.log(result);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	userValidation: function(user, callback){
		var sql = "select * from users where username='"+user.uname+"' and password='"+user.password+"'";
		//console.log(sql);
		db.getResults(sql, function(result){
			console.log(result);
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	addUser: function(user, callback){
		var sql = "insert into employee values('', '"+user.name+"', '"+user.contact+"','"+user.username+"','"+user.password+"')";
		console.log(user);
		console.log(sql);
		db.execute(sql, function(insertId){
					if(insertId>0){
						callback(true);
			}
			else
				callback(false);
			// if(status){
			// 	callback(true);
			// }else{
			// 	callback(false);
			// }
		});
	},
	addProduct: function(user, callback){
		var sql = "insert into product values('', '"+user.name+"', "+user.quantity+","+user.price+")";

		//console.log(sql);
		db.execute(sql, function(insertId){
					if(insertId>0){
						callback(true);
			}
			else
				callback(false);
			// if(status){
			// 	callback(true);
			// }else{
			// 	callback(false);
			// }
		});
	},
	userUpdate: function(user, callback){
		var sql = "update employee set name='"+user.name+"',contact='"+user.contact+"',username='"+user.username+"',password='"+user.password+"' where id="+user.id+" ";
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	userDelete: function(id, callback){
		var sql = "delete from employee where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	productDelete: function(id, callback){
		var sql = "delete from product where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	empSearch: function(name, callback){
		var sql = "SELECT * from employee where name like %"+name+"%";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
