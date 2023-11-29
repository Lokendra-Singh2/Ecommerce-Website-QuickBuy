
const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        firstName:{
        type:String,
        require:true,
        ///validator:validator.isAlpha
        },
        lastName:{
        type:String,
        required:true,
        ///validator:validator.isAlpha
        },
    },
    profilPic:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        require:true,
        //validator:validator.isNumeric
    },
    email:{
        type:String,
        required:true,
        //validator:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        //validator:validator.isStrongPassword
    },
    role:{
        type:String,
        // type:required,
        default:'customer',
        enum:[
            'customer',
            'admin'
        ]
    },
    securityQuestion: {
        type:String,
        required:true,
        enum:[
            'what is your nick name?',
            'what is your hometown?',
            'What is your mother and fathers nick name?'
        ]
    },
    securitAnswer:{
        type: String ,
        required: true,
    }

});

userSchema.pre('save', function(){
    if (this.isModified('password')) {
      this.password =  bcrypt.hashSync(this.password, salt);
    }
  })
  
  
  module.exports = mongoose.model('Usersdata', userSchema);