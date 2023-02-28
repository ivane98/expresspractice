const path = require("path");
const express = require("express");
const { logEvents, logger } = require("./middleware/logEvents");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("text").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
