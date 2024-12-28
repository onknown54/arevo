exports.CREATED = (resp, message, data) => {
  return SUCCESS_RESPONSE(resp, 201, message, data);
};

exports.SUCCESS = (resp, message, data) => {
  return SUCCESS_RESPONSE(resp, 200, message, data);
};

exports.ACCEPTED = (resp, message, data) => {
  return SUCCESS_RESPONSE(resp, 202, message, data);
};

exports.BAD_REQUEST = (resp, message) => {
  return this.ERROR_RESPONSE(resp, 400, message);
};

exports.NOT_FOUND = (resp, message) => {
  return this.ERROR_RESPONSE(resp, 404, message);
};

exports.UNAUTHORISED = (resp, message) => {
  return this.ERROR_RESPONSE(resp, 401, message);
};

exports.FORBIDDEN = (resp, message) => {
  return this.ERROR_RESPONSE(resp, 403, message);
};

exports.SERVER_ERROR = (resp, message) => {
  return this.ERROR_RESPONSE(resp, 403, message);
};

exports.ERROR_RESPONSE = (resp, statusCode, message, data) => {
  return RESPONSE(resp, statusCode, "failed", message, data);
};

function SUCCESS_RESPONSE(resp, statusCode, message, data) {
  return RESPONSE(resp, statusCode, "success", message, data);
}

function RESPONSE(resp, statusCode, status, message, data) {
  return resp.status(statusCode).json({
    status,
    message,
    data,
  });
}
