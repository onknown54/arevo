const express = require("express");
const router = express.Router();
const {
  sendNewsletter,
  getNewsletters,
} = require("../controllers/newsletter.controller");
const { validateBody } = require("../middlewares/joi.middleware");
const { contactSchema } = require("../utilities/validationSchema.utility");

router
  .route("/")
  .post(validateBody(contactSchema), sendNewsletter)
  .get(getNewsletters);

module.exports = router;
