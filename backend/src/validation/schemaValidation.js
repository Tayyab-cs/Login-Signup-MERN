import joi from "joi";

const validateSignUp = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateLogin = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateUpdatePassword = joi.object().keys({
  email: joi.string().email().required(),
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

const validateEmail = joi.object().keys({
  email: joi.string().email().required(),
});

const validatePassword = joi.object().keys({
  newPassword: joi.string().required(),
});

export {
  validateSignUp,
  validateLogin,
  validateUpdatePassword,
  validateEmail,
  validatePassword,
};
