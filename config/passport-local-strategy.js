const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Employee=require('../models/employee');



passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    Employee.findOne({email:email},function(err,emp){
        if(err){
            console.log("Error in finding the user");
        return done(err);
        }
        if(!emp || emp.password!=password){
            console.log("Invalod username");
            return done(null,false);
        }
        
        return done(null,emp);
     
    });
}
));


passport.serializeUser(function(emp,done){
    done(null,emp.id);
});

passport.deserializeUser(function(id,done){
    Employee.findById(id,function(err,emp){
        if(err){
            console.loh("Error in finding the user");
            return done(err);

        }
        return done(null,emp);
    })
});


passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/sign-in');
}

passport.setAuthenticatedEmp=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.emp=req.emp;

    }
    next();
}


module.exports=passport;