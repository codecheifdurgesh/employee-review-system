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
        admin:{
            type:Boolean,
            
        },
        review:[{
            'empname':String
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