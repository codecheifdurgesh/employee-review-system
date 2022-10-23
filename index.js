const express=require('express')
const port =8000
const app=express();
const db=require('./config/mongoose');
const MongoStore=require('connect-mongo');
const bodyparser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name:'Emp Review System',
    secret:'blahsomethis',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/employee-review-sysytm',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || "connect-mongodb setup ok");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedEmp);

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in rnning the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
  
});