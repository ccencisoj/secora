const Joi = require("joi");
const ColorError = require("../errors/ColorError");

const validator = Joi.string();

const validateBodyColorId = (req, res, next)=> {
  const bodyColorId = req.body.colorId;
  const validationResult = validator.validate(bodyColorId);
  const colorId = validationResult.value;

  if(validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    throw new ColorError(errorMessage);
  }

  next();
}

module.exports = validateBodyColorId;