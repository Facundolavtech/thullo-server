const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB is connected to: ", db.connection.name);
})();
