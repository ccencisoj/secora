const generateUserId = require("../utils/generateUserId");

const requiredUserId = (req, res, next)=> {
  const session = req.session;
  if(!session.userId) session.userId = `${generateUserId()}`;
  next();
} 

module.exports = requiredUserId;