const Joi = require("joi");
const Color = require("../models/Color");
const UserIdError = require("../errors/UserIdError");

const validator = Joi.string();

const validateParamUserId = async (req, res, next)=> {
  const paramUserId = req.params.userId;

  if(paramUserId === undefined || !paramUserId) {
    const errorMessage = `El /:id pasado por URL no esta registrado`;
    throw new UserIdError(errorMessage);
  }
  
  const validationResult = validator.validate(paramUserId);
  const userId = validationResult.value;
  
  if(validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    throw new UserIdError(errorMessage);
  }

  const existsUser = await Color.findOne({user: userId});

  if(existsUser === null || !existsUser) {
    const errorMessage = `El /:id pasado por URL no esta registrado`;
    throw new UserIdError(errorMessage);
  }

  req.params.userId = userId;
  next();
}

module.exports = validateParamUserId;