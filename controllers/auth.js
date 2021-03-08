const User=require('../models/user')
const jwt = require('jsonwebtoken');
const jwtsecret="MERNSTACK";
const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, jwtsecret, {
      expiresIn: "1d",
    });
  };

exports.signup=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user){
            res.status(400).json({msg:'user  found'});
        }
        else{
            const { firstName, lastName, email, password } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
              });
                _user.save((error,data)=>{
                    if(error){
                        return res.status(400).json({
                            message: "Something went wrong",
                          });
                    }
                    if(data){
                       // const token = generateJwtToken(user._id, user.role);
                      //  const { _id, firstName, lastName, email, role, fullName } = data;
                        return res.status(201).json({
                            message:"user created",
                            user: data,
                          });
                    }
                }) ; 
            }
    });
}


exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user){
           
            if(user.authenticate(req.body.password)){
               // res.status(200).json({msg:'true password'});
              // const token = "kdck";
            const token = generateJwtToken(user._id, user.role);
              const { _id, firstName, lastName, email, role, fullName } = user;
              res.status(200).json({
                token,
                user: { _id, firstName, lastName, email, role, fullName },
              });
            } else{
                res.status(400).json({msg:'wrong password'});
            }
        }
        else{
            res.status(400).json({msg:'no user found'});
            }
        if(error){
            res.status(400).json({msg:'something went wrong'});
        }
       
    });
}

exports.requiresignin=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,jwtsecret);
    req.user=user;
    console.log("token",token);
    next();
}