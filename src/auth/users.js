require('dotenv').config();

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET=process.env.SECRET|| 'MySecret';
const db={};
const Users={};
// signup
Users.save=async function (recourd) {
  if(!db[recourd.username]){
    recourd.password=await bcrypt.hash(recourd.password,5);
    db[recourd.username]=recourd;
    return recourd;
  }
  return Promise.reject();
};
// signin
Users.authenticationBasic=async function (user,pass) {
  const valid=await bcrypt.compare(pass,db[user].password);
  return valid ? db[user] : Promise.reject('wrong password');
};

Users.generateToken=function (user){
  const token=jwt.sign({username:user.username},SECRET);
  return token;
};
Users.list=()=>db;

module.exports=Users;


