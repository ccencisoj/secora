const capitalizeFirstLetter = require("../utils/capitalizeFirstLetter");

const validateQueryLanguage = (req, res, next)=> {
  const queryLanguage = (req.query.language || "js") + "";
  const language = queryLanguage.toLocaleLowerCase();
  req.query.language = language;
  next();
}

module.exports = validateQueryLanguage;