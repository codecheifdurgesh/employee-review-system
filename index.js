const express=require('express')
const port =8000
const app=express();
const db=require('./config/mongoose');
const bodyparser = require('body-parser');
const cookieParser=require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in rnning the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
  
});