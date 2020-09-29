const User = require('../models/users')
const shortid = require('shortid')
const jwt =require('jsonwebtoken')
const expressJwt = require('express-jwt');



exports.signup = (req,res)=>{
      User.findOne({email:req.body.email}).exec( (err,user) =>{
            if(user){
                 return res.status(400).json({error:"User Already Register"})
            }

            const {email,name,password} = req.body

            let username = shortid.generate()
            let profile= `${process.env.CLIENT_URL}/profile/${username}`

            let newUser = new User({name,email,password,profile,username})

             newUser.save( (err,success) =>{
                  if(err){
                       return res.status(400).json({error:err})
                  }
                  res.status(200).json({message:"Signup successfully please login"})
                  

            })
      })
}


exports.signin = (req,res) =>{
      const {email,password}= req.body;
      User.findOne({email}).exec( (err,user) =>{
            if(err || !user){
                 return res.status(400).json({
                       error:"User not Found! please signup" 
                  })
            }

            if(!user.authenticate(password)){
                 return res.status(400).json({
                        error:"Password dosenot match"
                  })
            }

            //create token

            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'})

            res.cookie('token',token,{expiresIn:'2d'})

            const {_id,name,username,email,role,profile} = user

            res.status(200).json({
                  token,
                  user:{_id,name,username,email,role,profile} 
            })
            
      })
}

exports.signout = (req,res)=>{
      res.clearCookie('token');
      res.status(200).json({
            message:"Logout successfully"
      })
};

exports.requireSignin= (req,res,next)=>{
      if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token,process.env.JWT_SECRET);
              req.user = user
      }else{
            res.status(400).json({message:"Authentication required"})
      }
   
    next();

}

exports.authMiddleware = (req,res,next) =>{
      const authId = req.user._id
      User.findById({_id:authId}).exec( (err,user)=>{
            if(err || !user){
                 return res.status(400).json({error:"User not Found"})
            }
            req.profile = user
            next()
      })
}


exports.AdminMiddleware = (req,res,next) =>{
      const authId = req.user._id
      User.findById({_id:authId}).exec( (err,user)=>{
            if(err || !user){
                 return res.status(400).json({error:"User not Found"})
            }
            console.log(user.role)
            if(user.role !== 1){
                  return res.status(400).json({error:"Only Admin can authorized"})   
            }
            req.profile = user
            next()
      })
}