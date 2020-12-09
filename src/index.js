const express = require("express");
const app = express();
const port = process.env.port || 4000;
require("./config/db");

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => console.log(`Server on`));
