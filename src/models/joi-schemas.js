import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// Schema for signup form and for API 
export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");


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
