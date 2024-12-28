/* eslint-disable linebreak-style */
const app = require("./app");
const listEndPoints = require("list_end_points");
const catchErr = require("./utilities/catchErr.utility");
const connectDatabase = require("./config/db.config");
const start = catchErr(async () => {
  await connectDatabase(process.env.MONGODBURL);

  app.listen(process.env.PORT, () => {
    console.log(`Betuptip Server Listening on ${process.env.PORT}`);
    process.env.DEV_ENV === "development" && listEndPoints.default(app);
  });
});

start();
