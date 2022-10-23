const express = require('express');
const { remove } = require('../models/employee');
const app = express();
const Employee = require('../models/employee');
let empCount = 0;

module.exports.home = function (req, res, err) {



    let Emp = req.user;



    return res.render(
        'home',
        {

            emp: Emp,
        }
    );
}

module.exports.signin = function (req, res, err) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    else {
        return res.render('emp_sign_in');
    }

}


module.exports.signup = function (req, res, err) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    else {
        return res.render('emp_sign_up');
    }
}

module.exports.create = async function (req, res, err) {

    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    Employee.findOne({ email: req.body.email }, function (err, emp) {
        if (err) {
            console.log("Error in finding the employee");
            return;
        }
        if (!emp) {
            Employee.create(req.body, async function (err, emp) {
                if (err) {
                    console.log(err);
                    console.log("Error in creating the user");
                    return;
                }
                Employee.count({}, async function (err, count) {
                    console.log("number of employess" + count);
                    if (count == 1) {
                        emp.isadmin = "true";
                        await emp.save();
                        console.log("made an admin");
                    }
                    else {
                        emp.isadmin = "false";
                        await emp.save();
                        console.log("made an employee");
                    }

                });
                console.log("employee created succesfully");

                return res.render('emp_sign_in');
            })




        }
        else {
            console.log("employee exists");
            return res.render('emp_sign_in');
        }
    })
}

module.exports.add = async function (req, res, err) {



    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    Employee.findOne({ email: req.body.email }, function (err, emp) {
        if (err) {
            console.log("Error in finding the employee");
            return;
        }
        if (!emp) {


            Employee.create(req.body, async function (err, emp) {
                if (err) {
                    console.log(err);
                    console.log("Error in creating the user");
                    return;
                }
                Employee.count({}, async function (err, count) {
                    console.log("number of employess" + count);
                    if (count == 1) {
                        emp.isadmin = "true";
                        await emp.save();
                        console.log("made an admin");
                    }
                    else {
                        emp.isadmin = "false";
                        await emp.save();
                        console.log("made an employee");
                    }

                });
                console.log("employee created succesfully");

                Employee.find({}, function (err, emp) {
                    console.log(emp);
                    if (err) {
                        console.log("Error in finding the employee");
                        return;
                    }
                    return res.render('all_emp', {
                        emps: emp,
                    });
                })
            })




        }
        else {
            console.log("employee exists");
            Employee.find({}, function (err, emp) {
                console.log(emp);
                if (err) {
                    console.log("Error in finding the employee");
                    return;
                }
                return res.render('all_emp', {
                    emps: emp,
                });
            })
        }
    })
}

module.exports.createSession = function (req, res, err) {
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports.showEmp = function (req, res, err) {
    Employee.find({}, function (err, emp) {
        console.log(emp);
        if (err) {
            console.log("Error in finding the employee");
            return;
        }
        return res.render('all_emp', {
            emps: emp,
        });
    })

}

module.exports.addEmp = function (req, res, err) {
    Employee.find({}, function (err, emp) {
        console.log(emp);
        if (err) {
            console.log("Error in finding the employee");
            return;
        }
        return res.render('add_empe', {
            emps: emp,
        });
    })
}

module.exports.assignWork = function (req, res, err) {
    Employee.find({}, function (err, emp) {

        if (err) {
            console.log("Error in finding the employee");
            return;
        }
        return res.render('assign_work', {
            emp: emp,
        });
    })
}

module.exports.updateStatus = function (req, res, err) {

    console.log(req.body);

    Employee.findOne({ email: req.body.empid }, async function (err, emp) {
        if (err) {
            console.log("Error in finding the user");
            return;
        }
        emp.isadmin = "true";
        await emp.save();
        return res.redirect('back');
    });
}

module.exports.assignReview = function (req, res, err) {

    console.log("printing the request");
    console.log(req.body);
    let recipient = req.body.recipient.split(",");
    let recipientName = recipient[0];
    let recipientEmail = recipient[1];
    let reviewerR = req.body.reviewer;

    console.log(recipientName);
    console.log(recipientEmail);
    console.log(reviewerR);



    Employee.findOne({ email: req.body.reviewer }, async function (err, emp) {


        if (err) {
            console.log("Error in finding the user");
            return;
        }
        let review = emp.review;


        let temp = {
            'empname': recipientName,
            'empemail': recipientEmail,

        }
        review.push(temp)
        await emp.save();
        console.log(emp);
        return res.redirect('back');
    });


}


module.exports.addReview=function(req,res,err){
    console.log(req.body);
    Employee.findOne({email:req.body.toemail},async function(err,emp){
        if(err){
            console.log("Eror in finding the user");
            
        }
        else{
        let review={
            'from':req.body.fromname,
            'message':req.body.feedback,
        }
        emp.myReviews.push(review);
        await emp.save();
        console.log(emp);

    }

    });
   
    return res.redirect('back');
    
}

module.exports.deleteEmployee=function(req,res,err){
    Employee.findById(req.params.id,function(err,emp){
        if(err){
            console.log("Unable to find the employee");
            return ;
        }
        else{
            emp.remove();
            console.log("employee deleted succesfully");
            return res.redirect('back');
        }
    })
}


