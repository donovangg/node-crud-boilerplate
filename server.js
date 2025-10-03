const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "db.json";

// Ensure db.json exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Helper: load submissions
function loadSubmissions() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Helper: save submissions
function saveSubmissions(submissions) {
  fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
}

// GET all submissions
app.get("/submissions", (req, res) => {
  res.json(loadSubmissions());
});

// POST new submission
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