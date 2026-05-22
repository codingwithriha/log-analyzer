const express = require("express");
const multer = require("multer");
const fs = require("fs");

const parseLine = require("./parser");
const analyzeLogs = require("./analyzer");

const app = express();

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.send("Log Analyzer API is running");
});

app.post("/analyze", upload.single("logFile"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a log file",
      });
    }

    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    const lines = fileContent.split("\n");

    const parsedLogs = [];

    let malformedLines = 0;

    for (const line of lines) {
         if (!line.trim()) {
    continue;
  }
      const parsed = parseLine(line);
      if (parsed) {
        parsedLogs.push(parsed);
      } else {
        malformedLines++;
      }
    }

    const report = analyzeLogs(parsedLogs, malformedLines);

    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
