const mongoose = require("mongoose");
const User = require("./models/User");
const { generateRandomID } = require("./utilities/help.utility");
require("dotenv").config();

async function migrateTelegramIds() {
  try {
    await mongoose.connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    await User.updateMany({}, { $set: { telegram_id: undefined } });
    console.log("All telegram_id fields set to undefined");

    const users = await User.find({});
    for (let user of users) {
      user.telegram_id = `BOT_${generateRandomID({ length: 8, camelCased: true })}`;
      await user.save();
    }

    console.log("All telegram_id fields have been updated with unique IDs");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error during migration:", error);
    mongoose.connection.close();
  }
}

migrateTelegramIds();
