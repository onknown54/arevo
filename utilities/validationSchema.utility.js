const Joi = require("joi");

const STRING_SCHEMA = Joi.string().trim();
const BOOLEAN_SCHEMA = Joi.boolean();
const DATE_SCHEMA = Joi.date();
const EMAIL_SCHEMA = STRING_SCHEMA.email({ tlds: false });
const NAME_SCHEMA = STRING_SCHEMA.min(3).max(25);

const optionalSchema = (schema) => schema.optional();
const requiredSchema = (schema) => schema.required();

exports.contactSchema = Joi.object({
  firstname: requiredSchema(NAME_SCHEMA),
  middlename: optionalSchema(NAME_SCHEMA),
  lastname: requiredSchema(NAME_SCHEMA),
  education: requiredSchema(STRING_SCHEMA),
  profession: requiredSchema(STRING_SCHEMA),
  nationality: requiredSchema(STRING_SCHEMA),
  country_of_residence: requiredSchema(STRING_SCHEMA),
  race: requiredSchema(STRING_SCHEMA),
  weight: requiredSchema(STRING_SCHEMA),
  date_of_birth: optionalSchema(DATE_SCHEMA),
  height: requiredSchema(STRING_SCHEMA),
  eyeColor: requiredSchema(STRING_SCHEMA),
  address: optionalSchema(STRING_SCHEMA),
  email: optionalSchema(EMAIL_SCHEMA),
  illness: optionalSchema(STRING_SCHEMA),
  medications: optionalSchema(BOOLEAN_SCHEMA),
  gender: requiredSchema(STRING_SCHEMA.valid("male", "female")),
  relationship_status: requiredSchema(
    STRING_SCHEMA.valid("single", "married", "divorced"),
  ),
  relocation: requiredSchema(STRING_SCHEMA),
  deported: requiredSchema(BOOLEAN_SCHEMA),
  deported_country: optionalSchema(STRING_SCHEMA),
  visa_type: requiredSchema(
    STRING_SCHEMA.valid("worker", "student", "investor", "tourist"),
  ),
});
