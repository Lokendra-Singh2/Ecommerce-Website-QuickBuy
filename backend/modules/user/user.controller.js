const userSchema = require("../../models/userSchema");
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require("./user.const");

async function login(req,res) {
    try{
    const {
        username,password
    } = req.body;

    const user = await userSchema.findOne({
        $or: [
            {
                email:username
            },
            {
                mobile:username
            }
        ]
    });
    if(!user){
        throw ({message: 'User not registered'});
    }
    if(!bcrypt.compareSync(password, user.password)){
        throw({message: 'Password not Matched'});
    }

    const token = generateToken(user);
    const options = {
        http:true,
        expireIn: 7*24*60*60*1000
    };
    return res.status(200).cookie('token',token,options).json({
        message:SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
        data: {user}
    })
    }catch(error){
        console.log(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }
}
async function logout(req,res) {
    try{
       return res.status(200).cookie('token',null).json({
        message: SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
        data: {}
       });
    }catch(error){
       return res.status(500).json({
        message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        error,
       })
    }
}

async function getMyProfile(req,res) {

    try{
        const {user} = req;
        return   res.status(200).json({
            data:{user},
            message: SUCCESS_MESSAGES.SUCCESSFULLY_FETCHED_PROFILE
        })
    }catch(error){
        return res.status(500).json({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            error,
          })
    }
}

async function registerNewUser(req,res) {
    
try{
    const {name,email,password,mobile,profilePic} = req.body;
    const users = await userSchema.find({
        $or:[
            {
                email
            },
            {
                mobile
            }
        ]
    });
    console.log(name,email,password,mobile,profilePic);

    const user = new userSchema ({
        name,email,password,mobile,profilePic
    });
    await user.save();
    const token = generateToken(user);
    const options = {
        http: true,
        expiresIn: 7*24*60*60*1000
    };
    return res.status(200).cookie('token',token,options).json({
        message: SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
        data: {user}
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
        message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        error,
    })
}

}
async function updateMyProfile(req,res) {
    try {
        const {
          email,
          mobile,
          name,
          profilePic,
        } = req.body;
        const { user } = req;
        if(email) {
          const userCount = await UserSchema.count({
            email,
            _id: { $ne: user._id }
          })
          if(userCount){
            throw ({ message: 'Email already registered with other user'});
          }
        }
        if(mobile) {
          const userCount = await UserSchema.count({
            mobile,
            _id: { $ne: user._id }
          })
          if(userCount){
            throw ({ message: 'Mobile already registered with other user'});
          }
        }
        const updateQuery = {
          name,
          email,
          mobile,
          profilePic
        };
        await UserSchema.updateOne({_id: user._id},{$set: updateQuery });
        return res.status(201).json({
          message: SUCCESS_MESSAGES.SUCCESSFULLY_UPDATED_PROFILE,
          data: {}
        })
      } catch (error) {
        return res.status(500).json({
          message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          error,
        });
    }    
}
async function getAllUser(req,res) {
    try{
    const users = await userSchema.find();
    return res.status(200).json({
        data:{users},
        message: SUCCESS_MESSAGES.SUCCESSFULLY_FETCHED_ALL_USERS
    })
    }catch(error){
        return res.status(500).json({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            error,
          })
    }
}
async function deleteUser(req,res) {
    try{
    const {id} = req.params;
    const user = await userSchema.findById(id);
    if(!user){
        throw ({ message: 'Invalid user Id'});
    }
    await userSchema.deleteOne({_id: id});
    return res.status(202).json({
        message: 'Successfully delete user'
     })
   } catch(error) {
     return res.status(500).json({
       message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
       error,
     })
   }
}
async function forgotPassword(req,res) {
    try {
      const { email, securityQuestion, securityAnswer } = req.body;
      const users = await UserSchema.find({
        email, securityQuestion
      });
      if (!users.length || users.length >1) {
        throw ({ message: 'user not found'});
      };
      const user = users[0];
      if(securityAnswer != user.securityAnswer){
        throw ({ message: 'user answer didnot matched' })
      }
      const token = generateToken(user);
      const options = {
        http: true,
        expiresIn: 7*24*60*60*1000 
      };
      return res.status(200).cookie('token', token, options).json({
        message: SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
        data: { user }
      })
    } catch (error) {
      return res.status(500).json({
        message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        error,
      })
    }
  }
  async function updatePassword(req,res) {
    try {
      const { user } = req;
      const { password, email } = req.body;
      if(email != user.email){
        throw({ message: 'Invalid email'});
      }
      await UserSchema.updateOne({ _id: user._id }, { $set: password });
      return res.status(200).clearCookie('token').json({
        message: SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
        data: {}
      });
    } catch (error){
      return res.status(500).json({
        message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
        error,
      });
    }
  }


module.exports = {
    login,
    logout,
    getMyProfile,
    updateMyProfile,
    registerNewUser,
    getAllUser,
    deleteUser,
    forgotPassword,
    updatePassword
}
