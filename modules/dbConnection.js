var mongoose = require('mongoose');

var url = "mongodb://localhost/registeredUsers";

// Check the connection
mongoose.connect(url, function(err,succ){
    if(err){
        console.log("Error in connection: " + err);
    }
    else{
        console.log("Connected to database" + url);
    }

});

var Schema = mongoose.Schema;

var users = new Schema({
    name:{type:String,index:{unique:true}},
    password:String,
    email:String,
});

var User = mongoose.model("User", users);

var addresses = new Schema({
    owner:String,
    name2:{type:String,index:{unique:true}},
    address:String,
    email2:String,
    phonenumber:String,
    birthday:Date,
    generalinfo:String
});

var Address = mongoose.model("Address", addresses);

var currentUser = null;

exports.addUser = function(req,res){
    console.log("New user to be added");
    console.log(req.body);
    var temp = new User({
        name:req.body.username,
        password:req.body.password,
        email:req.body.email
    });
    
    temp.save(function(err){
        if(err){
             console.log("Error" + err);
        }
        else{
            console.log("New user added");
            console.log(req.body.username);
            console.log(req.body.password);
            console.log(req.body.email);
            res.render('index');
        }
    });
    
    /********/
    console.log("List users");
    User.find(function(err,data){
        if(err){
            res.render("Error" + err);
            //res.render("myerror",{});
        }
        else{
            console.log(data);
            //res.render('userlist',{users_data:data});
        }
    });
    /********/
}

exports.login = function(req,res){
    console.log("wuhuu");
    console.log(req.body.username);
    console.log(req.body.password);
    
    console.log("List users");
    User.find(function(err,data){
        if(err){
            res.render("Error" + err);
            //res.render("myerror",{});
        }
        else{
            console.log(data);
            
            for(i=0; i<data.length; i++){
                console.log("käyttäjät: " + data[i].name + data[i].password);
                
                if(data[i].name == req.body.username && data[i].password == req.body.password ){
                    console.log("on sama " + data[i].name + " " + data[i].password );
                    res.render('members', data[i]);
                    currentUser = data[i].name;
                    console.log('kurrentti juuseri: ' + currentUser);
                    break;
                }
                else{
                    console.log("ei oo sama");
                    //res.render('nonmembers');
                }
                
            }
            
            
            
            //res.render('userlist',{users_data:data});
         }
    });
}

exports.listusers = function(req,res){
    console.log("List users");
    User.find(function(err,data){
        if(err){
            res.render("Error");
            //res.render("myerror",{});
        }
        else{
            console.log(data);
            //res.render('userlist',{users_data:data});
        }
    });
}

/***************************************************/
exports.addNewAddress = function(req,res){
    console.log("wuhuu taas");
    
    console.log(req.body);
    console.log('kurrentti juuseri: ' + currentUser);
    
    var temp = new Address({
        owner:currentUser,
        name2:req.body.name2,
        address:req.body.address,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        birthday:new Date(req.body.birthday),
        generalinfo:req.body.generalinfo
    });

     console.log('temp data ' + temp);
    
    temp.save(function(err){
        if(err){
            console.log("Error");
            res.render('myerror',{});
        }
        else{
            console.log("All ok");
            res.render('members', {add_data:data});
            //exports.getCourses(req,res);
        }
    });
}

exports.listaddresses = function(req,res){
    console.log("List addresses");
    Address.find(function(err,data){
        if(err){
            res.render("Error");
            //res.render("myerror",{});
        }
        else{
            console.log(data);
            //res.render('userlist',{users_data:data});
        }
    });
}
/***************************************************/
/* malli.find({name:'markus'}, function(err,data) {
}); */