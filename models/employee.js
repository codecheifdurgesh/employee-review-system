const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema(
    {

        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isadmin:{
            type:String,
            
        },
        review:[{
            'empname':String,
            'empemail':String,
        }],
        myReviews:[{
            'from':String,
            'message':String
        }],


    },
    {
        timestamps:true,
    }
);

const Employee=mongoose.model('Employee',employeeSchema);
module.exports=Employee;