const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://boralrupak:pTF15a8Ayum2FKnL@namastenode.qk176.mongodb.net/devity"
  );
};

module.exports = connectDb;
