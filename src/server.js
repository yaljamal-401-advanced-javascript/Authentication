require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const router=require('./auth/routes.js');

const logger=require('./middleware/logger.js');
const error404=require('./middleware/404.js');
const error500=require('./middleware/500.js');

const app=express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(router);
app.use(logger);
app.use(error404);
app.use(error500);

module.exports={
  server:app,
  start:port=>{
    const PORT=port || process.env.PORT || 8080;
    app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
  },
};