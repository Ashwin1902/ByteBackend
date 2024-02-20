const express = require('express');
const passport = require('passport');
const user=require('../models/user');
const pom=require('../models/poem');
const { initialisingPassport } = require('../config/passportConfig');
const { isLoggedIn } = require('../middleware/checkAuth');
const router=express.Router();


initialisingPassport(passport);

router.get('/auth/register',(req,res)=>{
    res.send("route send");
})

router.post('/auth/register',async (req,res)=>{
    const User=await user.create(req.body);
    res.status(201).send(User);
})

router.post('/auth/login',passport.authenticate("local",{failureRedirect:'/auth/register',successRedirect:"/auth/user-details"}),async (req,res)=>{
})

router.get('/auth/user-details',async (req,res)=>{
    const User=req.user;
    res.status(201).send(User);
})

router.post('/poem/create',isLoggedIn,async (req,res)=>{
    try {
        const userId = req.user._id;
        const { poem, author } = req.body;
        const newPoem = new pom({
            poem,
            user: userId,
            author,
        });
        const savedPoem = await newPoem.save();
        res.status(201).send("Poem created successfully");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
})

router.get('/poem/get',isLoggedIn,async (req,res)=>{
       const Uid=req.user
       console.log(Uid);
       const poems=await pom.find({user:Uid});
       res.status(201).send(poems);
})


module.exports=router;