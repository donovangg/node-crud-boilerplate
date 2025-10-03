const form = document.getElementById("submissionForm");
const submissionsList = document.getElementById("submissionsList");

// Load existing submissions on page load
fetch("/submissions")
  .then(res => res.json())
  .then(data => {
    data.forEach(addSubmissionToList);
  });

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const code = document.getElementById("code").value.trim();

  if (!name || !code) return;

  fetch("/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, code })
  })
    .then(res => res.json())
    .then(data => {
      addSubmissionToList(data.submission);
      form.reset();
    });
});

// Helper: add a submission to the DOM
function addSubmissionToList(submission) {
  const li = document.createElement("li");
  li.textContent = `${submission.name} — ${submission.code}`;
  submissionsList.appendChild(li);
}
