const user = require('../auth/users.js');
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login No Oauth');
  } else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      console.log('Token', token);
      user.authenticationBasic(token).then((validUser) => {
        req.user = validUser;
        next();
      }).catch((err) => next('Invalid login ', err.message));
    } else {
      next('invalid auth header');
    }
  }
};