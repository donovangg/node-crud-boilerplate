const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// db.json 
const DB_FILE = "db.json";

// Checks if DB_File exists, if not it creates an empty array
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper function: Loads submissions from DB_File / db.json
// reads the File turns JSON into Javascript
function loadSubmissions() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Helper function: saves submissions into db.json
// converts our Javascript back to Json and writes it to the file
function saveSubmissions(submissions) {
  fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
}

// GET request to get all your submissions
// once project is running you can visit http://localhost:3000/submissions and see the data
app.get("/submissions", (req, res) => {
  res.json(loadSubmissions());
});

// POST request and pushes whats in the form into db.json
app.post("/submissions", (req, res) => {
  const submissions = loadSubmissions();
  const submission = req.body; // expects { name, code }
  submissions.push(submission);
  saveSubmissions(submissions);
  res.json({ success: true, submission });
});
// server uptime
app.listen(PORT, () => {
  console.log(`awwwwww yeeeeeee boi! Server running at http://localhost:${PORT}`);
});