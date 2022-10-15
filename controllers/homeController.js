const express = require('express');
const app = express();
const Employee=require('../models/employee');

module.exports.home=function(req,res,err){
    if(req.cookies.emp_id){
        Employee.findById(req.cookies.emp_id,function(err,emp){
            if(emp){
                return res.render('home',{
                    title:"Home page",
                    emp:emp
                })
            }
            else{
                return res.render('emp_sign_in');
            }
        })

    }
    else{
        return res.render('emp_sign_in');
    }
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
        return res.redirect('back');
        }
})
}

module.exports.createSession=function(req,res,err){
    Employee.findOne({email:req.body.email},function(err,emp){
        if(err){
            console.log("Error in finding the user");
            return ;
        }
        else{
         
            if(emp){
                if(emp.password!=req.body.password){
                    console.log("Password mismatch");
                    return res.redirect('back');
                }
                res.cookie('emp_id',emp.id);
                return res.redirect('/');
            }
            else{
                return res.redirect('back');
            }

        }
    })


}

module.exports.destroySession=function(req,res,err){

    res.clearCookie('emp_id');
    // REDIRECT OT HOME
    res.redirect('/');   



}