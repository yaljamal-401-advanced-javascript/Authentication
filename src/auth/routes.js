const express=require('express');
const router=express.Router();
const oauth=require('../middleware/github-outh.js');
const basicAuth=require('../middleware/basic-auth-middleware.js');
const users=require('./users.js');
const bearer=require('../middleware/bearer-aouth.js');
const userModel=require('../auth/model/user-model.js');

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/users',basicAuth,userslist);
router.get('/oauth',oauth,githubOauth);
router.get('/secret',bearer,secret);

function secret(req,res) {
  res.json({token:req.token});
}

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