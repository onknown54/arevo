const jwt = require("jsonwebtoken");

exports.generateRandomID = ({
  length = 6,
  specialCharacter = false,
  camelCased = true,
  alphaNumeric = true,
} = {}) => {
  length = Math.max(6, length);

  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = "";
  if (alphaNumeric) characters += digits;
  if (camelCased) characters += lowerLetters + upperLetters;
  else characters += upperLetters;
  if (specialCharacter) characters += specialChars;

  if (!characters) {
    characters = digits + upperLetters;
  }

  let result = [];

  if (camelCased) {
    result.push(lowerLetters[Math.floor(Math.random() * lowerLetters.length)]);
  }

  result.push(upperLetters[Math.floor(Math.random() * upperLetters.length)]);

  if (alphaNumeric) {
    result.push(digits[Math.floor(Math.random() * digits.length)]);
  }

  if (specialCharacter) {
    result.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
  }

  for (let i = result.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result.push(characters[randomIndex]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
};

exports.createToken = (data) => {
  const payload = {
    userData: {
      id: data._id,
    },
  };

  return jwt.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.JWTLIFETIME,
  });
};

exports.ensureObject = (obj) => {
  if (typeof obj !== "object" || !obj) return {};
  return obj;
};
