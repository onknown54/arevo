/* eslint-disable linebreak-style */
const User = require("../models/User");
const catchErr = require("../utilities/catchErr.utility");
const throwError = require("../utilities/errorHandler.utility");
const APIFeature = require("../utilities/APIFeature");

const { ensureObject } = require("../utilities/help.utility");

exports.getUser = catchErr(async (req, resp, next) => {
  const { id, subscriptionInfo } = ensureObject(req.user);
  if (!id) return next(new throwError("Unable to proccess request", 400));

  const userInst = new APIFeature(User.findOne())
    .find({ _id: id, status: "active" })
    .limitFields();
  let user = await userInst.query;

  if (!user) return next(new throwError("Unable to proccess request", 400));

  user = user.toObject();

  resp.status(200).json({
    status: true,
    subscription_count: subscriptionInfo.count,
    message: "Fetched successfully",
    user: {
      ...user,
      subscription_plan: subscriptionInfo.plans.join(", "),
    },
  });
});
