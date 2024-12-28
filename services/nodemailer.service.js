const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: "MRmA7$IEdzYH" || SMTP_PASSWORD,
  },
});

const sendPasswordOtp = async (otpCode, email) => {
  const template_path = path.join(
    __dirname,
    "../../views/emails/passwordOtp.ejs",
  );

  const html = await ejs.renderFile(template_path, { otpCode });

  return await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Betuptip Password Verification",
    html,
  });
};

const sendEmailOtp = async (otpCode, email) => {
  const template_path = path.resolve(
    __dirname,
    "../../views/emails/emailOtp.ejs",
  );

  const html = await ejs.renderFile(template_path, { otpCode });

  return await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Betuptip Activation 🎉🎉",
    html,
  });
};

module.exports = { sendPasswordOtp, sendEmailOtp };
