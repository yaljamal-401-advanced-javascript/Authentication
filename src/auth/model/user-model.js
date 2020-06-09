const schema=require('../schema.js');
const Model=require('../../middleware/mongo.js');

class User extends Model{
  constructor(){
    super(schema);
  }
}
module.exports=new User();