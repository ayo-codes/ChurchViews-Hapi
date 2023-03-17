import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// Schema for Login form
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

// Schema for signup form and for API 
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray"); 

// We use UserArray to return an array of UserSpecPlus , that's what the difference is between it and UserSpecPlus

// Schema for Add Church Form modified for the web API
export const ChurchSpec = Joi.object().keys ({
  name: Joi.string().required().example("Whitefriar Street Church"),
  description: Joi.string().required().example("Catholic place of worship built to George Papworth's design in 1827"),
  latitude: Joi.number().allow("").optional().example(53.3174463),
  longitude: Joi.number().allow("").optional().example(-6.2695732),
  denominationid: IdSpec,
}).label("Church");

// separated the mongo generated fields
export const ChurchSpecPlus = ChurchSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ChurchPlus")

// This is used for when you need to return an array/list of churches
export const ChurchArraySpec = Joi.array().items(ChurchSpecPlus).label("ChurchArray");


// Schema for Add Denomination Form
export const DenominationSpec = Joi.object().keys ({
  title: Joi.string().required().example("Anglican"),
  userid: IdSpec,
  churches: ChurchArraySpec,
}).label("Denomination");

export const DenominationSpecPlus = DenominationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DenominationPlus");

export const DenominationArraySpec = Joi.array().items(DenominationSpecPlus).label("DenominationArray");

// for authentication 
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
