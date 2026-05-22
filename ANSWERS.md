
---

# 📄 ANSWERS.md

```md
# Answers

---

## 1. How to run

Install dependencies:

npm install

Start server:

node src/server.js

Open in browser:

http://localhost:3000

Generate sample logs:

node scripts/generateLogs.js

---

## 2. Stack choice

I used Node.js with Express because the task mainly involves reading files, parsing logs, and building a simple API.

JavaScript is very suitable for string handling and JSON parsing, which makes the log processing easier.

For the frontend, I used simple HTML, CSS, and JavaScript because the UI is small and does not need any framework.

I avoided React or any database because they were not required and would have made the project unnecessarily complex.

---

## 3. Edge case

One important edge case is handling malformed or incomplete log lines.

Empty lines are skipped in server.js before processing.

In parser.js, invalid or incomplete log lines return null so they do not break the system.

This ensures the application does not crash and only valid logs are analyzed.

---

## 4. AI usage

I used AI to understand the assessment requirements and to help structure the project.

It also helped me refine parsing logic and improve code readability.

One change I made was simplifying the frontend. Instead of using a framework like React, I used plain HTML, CSS, and JavaScript because the task did not require a complex UI.

I also simplified code structure to keep the project easy to understand.

---

## 5. Honest gap

The current version reads the entire file into memory before processing.

If I had more time, I would improve it using stream based processing so it can handle very large log files more efficiently.

Another improvement would be better log format detection and more detailed reporting for malformed lines.