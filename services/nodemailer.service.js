const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const catchError = require("../utilities/catchErr.utility");

const SMTP_USER = process.env.SMTP_USER;
// const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendNewsletters = catchError(async (data, email) => {
  const templatePath = path.join(__dirname, "../views/newsletter.view.ejs");

  const html = await ejs.renderFile(templatePath, { data }).catch((err) => {
    throw new Error(`EJS rendering failed: ${err.message}`);
  });

  const info = await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Arevo International contact information",
    html,
  });

  return info;
});
