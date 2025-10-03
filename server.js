const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// read database (our db.json)
function readDB() {
  return JSON.parse(fs.readFileSync("db.json", "utf8"));
}

// Write to db 
function writeDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// GET all submissions
app.get("/submissions", (req, res) => {
  res.json(readDB());
});

// POST new submission
app.post("/submissions", (req, res) => {
  const db = readDB();
  const newSubmission = {
    id: Date.now(),
    code: req.body.code,
    name: req.body.name || "Anonymous"
  };
  db.push(newSubmission);
  writeDB(db);
  res.json(newSubmission);
});


// server uptime
app.listen(PORT, () => {
  console.log(`awwwwww yeeeeeee boi! Server running at http://localhost:${PORT}`);
});