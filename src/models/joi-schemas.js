import Joi from "joi";

// Schema for signup form
export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

// Schema for Login form
export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

// Schema for Add Church Form
export const ChurchSpec = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  latitude: Joi.number().allow("").optional(),
  longitude: Joi.number().allow("").optional(),
};

// Schema for Add Denomination Form
export const DenominationSpec = {
  title: Joi.string().required(),
};
