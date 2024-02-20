const session=require('express-session');
const passport = require('passport');
const express = require('express');
const connectDb = require('./config/Db');
connectDb();
const app=express();

app.use(session({secret: "secret",
resave: "false", 
saveUninitialized: true,
})); 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/',require('./routes/router'));
app.use('*',(req,res)=>{
    res.status(404).send("There was some error, please try again");
})



app.listen(5000,()=>{
    console.log("started");
})