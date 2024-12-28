/* eslint-disable linebreak-style */
const _ = require("lodash");

const User = require("../models/User");
const catchErr = require("../utilities/catchErr.utility");
const throwError = require("../utilities/errorHandler.utility");

const {
  generateOTP,
  createToken,
  cleanInputData,
  ensureObject,
  generateRandomID,
} = require("../utilities/help.utility");

const { sendEmailOtp } = require("../services/nodemailer.service");

exports.register = catchErr(async (req, resp, next) => {
  const { email, password, firstname, lastname, phone, confirmPassword } =
    cleanInputData(ensureObject(req.body));

  if (
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    !phone ||
    !confirmPassword
  )
    return next(new throwError("Ensure all fields are filled", 400));

  if (password !== confirmPassword)
    return next(
      new throwError("Password and confirm password does not match", 400),
    );

  if (await User.findOne({ email }))
    return next(new throwError("Email is taken by another user", 406));

  const otp = generateOTP().toString();
  const _user = await User.create({
    email,
    password,
    firstname,
    lastname,
    phone,
    otpToken: otp,
    isEmailVerified: false,
    isAccountVerified: false,
    telegram_id: `BOT_${generateRandomID({ length: 8, camelCased: true })}`,
    customer_reference: `BTP-${(await User.find({})).length + 1}`,
  });

  const token = createToken(_user);
  const user = _.pick(_user, [
    "firstname",
    "lastname",
    "email",
    "phone",
    "is_premium",
    "telegram_id",
  ]);

  if (process.env.DEV_ENV === "production") {
    return await sendEmailOtp(otp, email)
      .then(() =>
        resp.status(201).json({
          status: true,
          message: "We have sent a verification code to your email address",
          user,
          token,
        }),
      )
      .catch((err) => next(new throwError(err.message, err.statusCode || 403)));
  }

  resp.status(201).json({
    success: true,
    message: `We have sent a Verification code ${otp} to your email address`,
    user,
    token,
  });
});
