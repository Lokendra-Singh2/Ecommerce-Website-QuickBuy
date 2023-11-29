const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
const secretKey = 'ftsacserngawearb';
const authorizeRoles = ['admin'];


function generateToken(data){
    console.log(data);
    const token = jwt.sign(data = { id: data._id},secretKey);
    return token;
}

async function authenticate(req,res,next){
    try{
      const token = req.cookies;
      if(!token){
        throw ({message:'please login before access'});
      }
      const decodeData = jwt.verify(token, secretKey);
      const {id} = decodeData;
      const user = await userSchema.findById(id);
      if(!user){
        throw({message:'unable to identify,please login again'});
      }
      req.user = user;
      next();
    }catch(error){
        return res.status(404).json({
            message: 'Something Went Wrong',
            error,
          })
    }
}

function authorize(req,res,next){
    try{
      const {user} = req;
      const {role} = user;
      if(authorizeRoles.find((element)=>element === role)) {
        return next();
      }
      return res.status(401).json({
      message: 'You are not authorize to access to this feature',
      error:{
        message: 'Unauthoried'
      },
      });
    }catch(error){
      console.log(error);
      return res.status(404).json({
        message: 'Something Went Wrong',
        error,
      });
    }
}


module.exports = {
    authenticate,
    generateToken,
    authorize
  }