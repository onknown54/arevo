/* eslint-disable linebreak-style */
const Newsletter = require("../models/Contact");
const { sendNewsletters } = require("../services/nodemailer.service");
const catchErr = require("../utilities/catchErr.utility");
const { SUCCESS } = require("../utilities/response.utility");

exports.sendNewsletter = catchErr(async (req, resp) => {
  const requestData = req.body;
  await sendNewsletters(requestData, "lekanm715@gmail.com");

  await Newsletter.create({
    firstname: requestData.firstname,
    middlename: requestData.middlename,
    lastname: requestData.lastname,
    education: requestData.education,
    profession: requestData.profession,
    nationality: requestData.nationality,
    country_of_residence: requestData.country_of_residence,
    race: requestData.race,
    weight: requestData.weight,
    date_of_birth: requestData.date_of_birth,
    height: requestData.height,
    eyeColor: requestData.eyeColor,
    address: requestData.address,
    email: requestData.email,
    illness: requestData.illness,
    medications: requestData.medications,
    gender: requestData.gender,
    relationship_status: requestData.relationship_status,
    relocation: requestData.relocation,
    deported: requestData.deported,
    deported_country: requestData.deported_country,
    visa_type: requestData.visa_type,
  });

  return SUCCESS(resp, "Newsletter sent successfully");
});

exports.getNewsletters = catchErr(async (req, resp) => {
  const newsletters = await Newsletter.find();
  return SUCCESS(resp, "Newsletter sent successfully", newsletters);
});
