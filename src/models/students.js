const mongoose = require('mongoose');
const validator = require('validator');
// import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3
  },
  emailid: {
     type:String,
     required:true,   
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
    }
  },
  phonenumber: {
    type: Number,
    min: 10,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true,

    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("choose Strong Pasword");
      }
    }
  },
  confirmpassword:{
    type:String,
    required:true
  },
  gender:{
    type:String
  }
});

const Student = mongoose.model('Studentdatabse', studentSchema);

module.exports = Student;
