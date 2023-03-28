const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://Kevin_Umayam:MongoPW123@cluster0.7lmrnmc.mongodb.net/?retryWrites=true&w=majority ",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
