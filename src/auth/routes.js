const express=require('express');
const router=express.Router();
const oauth=require('../middleware/github-outh.js');
const basicAuth=require('../middleware/basic-auth-middleware.js');
const users=require('./users.js');


router.post('/signup',signup);
router.post('/signin',signin);
router.get('/users',basicAuth,userslist);
router.get('/oauth',oauth,githubOauth);

function githubOauth(req,res) {
  res.json(users.list());
}

function signup(req,res){
  users.save(req.body)
    .then((user)=>{
      console.log(user);
      const token=users.generateToken(user);
      res.json({token});
    }).catch((err)=>res.status(403).send(err.message));
}

function signin(req,res) {
  res.status(200).send(req.token);
}

function userslist(basicAuth,req,res){
  res.status(200).json(users.list());
}
module.exports=router;