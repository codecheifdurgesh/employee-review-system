const express = require('express');
const app = express();
const Employee=require('../models/employee');

module.exports.home=function(req,res,err){
    let Emp=req.user;

  
    return res.render(
        'home',
        {
    
    emp:Emp,
}
    );
}

module.exports.signin=function(req,res,err){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    else{
    return res.render('emp_sign_in');
    }

}


module.exports.signup=function(req,res,err){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    else{
    return res.render('emp_sign_up');
    }
}

module.exports.create=function(req,res,err){

    if(req.body.password!=req.body.confirmPassword){
        return res.redirect('back');
    }
    Employee.findOne({email:req.body.email},function(err,emp){
        if(err){
            console.log("Error in finding the employee");
            return ; 
        }
        if(!emp){
            Employee.create(req.body,function(err,emp){
                if(err){
                    console.log(err);
                    console.log("Error in creating the user");
                    return ; 
                }
                console.log("employee created succesfully");
                return res.render('emp_sign_in');
            })
        }
        else{
            console.log("employee exists");
        return res.render('emp_sign_in');
        }
})
}

module.exports.createSession=function(req,res,err){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}