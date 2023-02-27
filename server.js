const path = require("path");
const express = require("express");
const { logEvents, logger } = require("./middleware/logEvents");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(logger);

app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello");
    next();
  },
  (req, res) => {
    res.send("hello");
  }
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
