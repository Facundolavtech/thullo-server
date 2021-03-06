const express = require("express");
const app = express();
const port = process.env.port || 4000;
require("./config/db");
const cors = require("cors");

//Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/boards"));
app.use("/api/lists", require("./routes/lists"));

app.listen(port, () => console.log(`Server on port ${port}`));
