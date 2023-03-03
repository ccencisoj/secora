const Joi = require("joi");
const ColorError = require("../errors/ColorError");

const validator = Joi.array().items(
  Joi.number().min(0).max(360).required(true),
  Joi.number().min(0).max(100).required(true),
  Joi.number().min(0).max(100).required(true)
);

const validateQueryWhatIsColor = (req, res, next)=> {
  let QueryWhatIsColor = req.query.whatIsColor;
  
  try {
    QueryWhatIsColor = JSON.parse(QueryWhatIsColor);
  }catch(error) {
    req.query.whatIsColor = null;
    return next();
  }

  const validationResult = validator.validate(QueryWhatIsColor);
  const whatIsColor = validationResult.value;

  if(validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    throw new ColorError(errorMessage);
  }

  req.query.whatIsColor = whatIsColor;
  next();
}
module.exports = validateQueryWhatIsColor;