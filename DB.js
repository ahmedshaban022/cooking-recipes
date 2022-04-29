const mongoose = require("mongoose");
const connetToDB = () => {
  try {
    mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) console.log(err);
        else console.log("Connected to DB");
      }
    );
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};
module.exports = connetToDB;
