const express=require('express');
const {signup,signin,requiresignin}=require('../../controllers/admin/auth');
const router=express.Router();
const User=require('../../models/user')

router.get('/',(req,res)=>{
    res.status(200).json({msg:'api test'})
});

router.post('/admin/signin',signin);
router.post('/admin/signup',signup);


module.exports=router;
/*
exports.getPost=(req,res)=>{
   res.send("hello world ")
};
module.exports={
	getPost
};*/