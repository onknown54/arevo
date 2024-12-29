const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please input your firstname"],
    },
    middlename: {
      type: String,
    },
    lastname: {
      type: String,
      required: [true, "Please input your lastname"],
    },
    education: {
      type: String,
      required: [true, "Please input your education"],
    },
    profession: {
      type: String,
      required: [true, "Please input your profession"],
    },
    nationality: {
      type: String,
      required: [true, "Please input your nationality"],
    },
    country_of_residence: {
      type: String,
      required: [true, "Please input your country of residence"],
    },
    race: {
      type: String,
      required: [true, "Please input your race"],
    },
    weight: {
      type: String,
      required: [true, "Please input your weight"],
    },
    date_of_birth: {
      type: Date,
      required: [true, "Please input your date of birth"],
    },
    height: {
      type: String,
      required: [true, "Please input your height"],
    },
    eyeColor: {
      type: String,
      required: [true, "Please input your eye color"],
    },
    address: {
      type: String,
      required: [true, "Please input your address"],
    },
    email: {
      type: String,
      required: [true, "Please input your email"],
      match: [/.+@.+\..+/, "Please input a valid email address"],
    },
    illness: {
      type: String,
    },
    medications: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please select a gender"],
    },
    relationship_status: {
      type: String,
      enum: ["single", "married", "divorced"],
      required: [true, "Please input your relationship status"],
    },
    relocation: {
      type: String,
      enum: ["uk", "canada", "usa", "france", "germany", "spain"],
      required: [
        true,
        "Please indicate a country or countries you're willing to relocate to",
      ],
    },
    deported: {
      type: Boolean,
      required: [true, "Please indicate if you have been deported"],
    },
    deported_country: {
      type: String,
    },
    visa_type: {
      type: String,
      enum: ["worker", "student", "investor", "tourist"],
      required: [true, "Please select your visa type"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Newsletters", contactSchema);
