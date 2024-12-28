const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/newsletter.controller");
const { validateBody } = require("../middlewares/joi.middleware");
const { loginSchema } = require("../utilities/validationSchema.utility");

router.post("/", validateBody(loginSchema), getUser);

module.exports = router;
