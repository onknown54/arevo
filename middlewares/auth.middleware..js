const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchErr = require("../utilities/catchErr.utility");
const APIFeature = require("../utilities/APIFeature");
const throwError = require("../utilities/errorHandler.utility");

exports.authMiddleware = catchErr(async (req, res, next) => {
  const token = req.header("usebetup-token");
  if (!token) return next(new throwError("Unauthorised", 401));

  const _jwt = jwt.verify(token, process.env.JWTSECRET);
  const _user = new APIFeature(User)
    .find({
      _id: _jwt?.userData?.id,
      status: "active",
    })
    .limitFields();
  const user = await _user.query;

  if (!user) return next(new throwError("Invalid token sent", 401));

  req.user = {
    id: user._id.toString(),
    email: user.email?.toLowerCase(),
    firstname: user.firstname,
    lastname: user.lastname,
    is_premium: user.is_premium,
  };

  next();
});
