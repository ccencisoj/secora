const Joi = require("joi");
const Color = require("../models/Color");
const ColorError = require("../errors/ColorError");

const validator = Joi.object({
  name: Joi.string()
    .uppercase()
    .required(true),
  range: Joi.array().items(
    Joi.array().items(
      Joi.number().min(0).max(360).required(true),
      Joi.number().min(0).max(100).required(true),
      Joi.number().min(0).max(100).required(true)
    ).required(true),
    Joi.array().items(
      Joi.number().min(0).max(360).required(true),
      Joi.number().min(0).max(100).required(true),
      Joi.number().min(0).max(100).required(true)
    ).required(true)
  ).required(true)
});

const validateBodyColor = async (req, res, next)=> {
  const bodyColor = req.body.color;
  const userId = req.session.userId;

  if(bodyColor === undefined || !bodyColor) {
    const errorMessage = `El campo color es requerido`;
    throw new ColorError(errorMessage);
  }

  const validationResult = validator.validate(bodyColor);
  const color = validationResult.value;

  if(validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    throw new ColorError(errorMessage);
  }
    
  const foundColor = await Color.findOne({
    name: color.name,
    user: userId
  });

  if(foundColor !== null) {
    const errorMessage = `El nombre de color "${color.name}" ya existe `;
    throw new ColorError(errorMessage);
  }

  req.body.color = color;
  next();
} 

module.exports = validateBodyColor;