const throwError = require("../utilities/errorHandler.utility");

exports.validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  return error ? next(new throwError(error.message, 400)) : next();
};
