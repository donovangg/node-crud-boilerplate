const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// read database (our db.json)



// server uptime
app.listen(PORT, () => {
  console.log(`awwwwww yeeeeeee boi! Server running at http://localhost:${PORT}`);
});