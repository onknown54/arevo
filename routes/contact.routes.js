/* eslint-disable linebreak-style */
const express = require("express");
const router = express.Router();
const { validateBody } = require("../middlewares/joi.middleware");

const { loginSchema } = require("../utilities/validationSchema.utility");
const { register } = require("../controllers/contact.controller");

router.post("/", validateBody(loginSchema), register);

module.exports = router;
