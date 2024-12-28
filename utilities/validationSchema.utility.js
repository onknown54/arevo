const Joi = require("joi");

const NUMBER_SCHEMA = Joi.number();
const STRING_SCHEMA = Joi.string().trim();
const ARRAY_SCHEMA = Joi.array();
const PASSWORD_SCHEMA = STRING_SCHEMA.min(6);
const EMAIL_SCHEMA = STRING_SCHEMA.email({ tlds: false });
const NAME_SCHEMA = STRING_SCHEMA.required().min(3).max(25);

const PLANS_SCHEMA = Joi.object({
  name: STRING_SCHEMA,
  duration: NUMBER_SCHEMA.integer(),
  price: NUMBER_SCHEMA.integer(),
});

const UPDATE_PLANS_SCHEMA = Joi.object({
  _id: STRING_SCHEMA,
  name: STRING_SCHEMA,
  duration: NUMBER_SCHEMA.integer(),
  price: NUMBER_SCHEMA.integer(),
});

const requiredSchema = (schema) => schema.required();
const appendStrict = (schema) => schema.strict();

exports.loginSchema = Joi.object({
  email: requiredSchema(EMAIL_SCHEMA),
  password: requiredSchema(PASSWORD_SCHEMA),
});

exports.emailVerify = Joi.object({
  email: requiredSchema(EMAIL_SCHEMA),
});

exports.changePassword = Joi.object({
  oldPassword: requiredSchema(PASSWORD_SCHEMA),
  newPassword: requiredSchema(PASSWORD_SCHEMA),
  confirmPassword: requiredSchema(PASSWORD_SCHEMA),
});

exports.verifyOtp = Joi.object({
  email: requiredSchema(EMAIL_SCHEMA),
  otp: requiredSchema(PASSWORD_SCHEMA.max(6)),
});

exports.verifyOtpCode = Joi.object({
  otp: requiredSchema(PASSWORD_SCHEMA.max(6)),
});

exports.registerSchema = Joi.object({
  firstname: requiredSchema(NAME_SCHEMA),
  lastname: requiredSchema(NAME_SCHEMA),
  phone: requiredSchema(STRING_SCHEMA.min(10).max(15)),
  email: requiredSchema(EMAIL_SCHEMA),
  password: requiredSchema(PASSWORD_SCHEMA),
  confirmPassword: requiredSchema(PASSWORD_SCHEMA),
});

exports.paymentSchema = Joi.object({
  email: requiredSchema(EMAIL_SCHEMA),
  user_id: requiredSchema(STRING_SCHEMA),
  full_name: requiredSchema(STRING_SCHEMA),
  amount: requiredSchema(NUMBER_SCHEMA),
  plan_name: requiredSchema(STRING_SCHEMA),
});

exports.createSubscriptionSchema = Joi.object({
  name: requiredSchema(appendStrict(STRING_SCHEMA)),
  benefits: requiredSchema(ARRAY_SCHEMA.items(appendStrict(STRING_SCHEMA))),
  plans: requiredSchema(ARRAY_SCHEMA.items(appendStrict(PLANS_SCHEMA))),
});

exports.updateSubscriptionSchema = Joi.object({
  name: appendStrict(STRING_SCHEMA),
  benefits: ARRAY_SCHEMA.items(appendStrict(STRING_SCHEMA)),
  plans: ARRAY_SCHEMA.items(appendStrict(UPDATE_PLANS_SCHEMA)),
});

exports.deleteSubscriptionSchema = Joi.object({
  _id: appendStrict(STRING_SCHEMA),
});
