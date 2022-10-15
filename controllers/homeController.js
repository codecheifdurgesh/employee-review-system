const express = require('express');
const app = express();
const Employee=require('../models/employee');

module.exports.home=function(req,res,err){
    return res.render('home');
}

module.exports.signin=function(req,res,err){
    return res.render('emp_sign_in');

}
module.exports.signup=function(req,res,err){
    return res.render('emp_sign_up');
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
                return res.redirect('/create-session');
            })
        }
        else{
        return res.redirect('/create-session');
        }
})
}

module.exports.createSession=function(req,res,err){
    return res.render('emp_sign_in');
}