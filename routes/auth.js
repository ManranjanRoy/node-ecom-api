const express=require('express');
const {signup,signin,requiresignin}=require('../controllers/auth');
const router=express.Router();
const User=require('../models/user')

router.get('/',(req,res)=>{
    res.status(200).json({msg:'api test'})
});

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/profile',requiresignin,(req,res)=>{
    res.status(200).json({msg:'profile'});
});

module.exports=router;
/*
exports.getPost=(req,res)=>{
   res.send("hello world ")
};
module.exports={
	getPost
};*/