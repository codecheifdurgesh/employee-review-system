const express=require('express')
const port =8000
const app=express();




app.get('/',function(req,res){
    return res.send("Hello server is up and running");
})
app.listen(port,function(err){
    if(err){
        console.log(`Error in rnning the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
  
});