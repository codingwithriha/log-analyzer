const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const parseLine = require("./parser");
const analyzeLogs = require("./analyzer");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const upload = multer({
  dest: "uploads/"
});

app.post("/analyze", upload.single("logFile"), (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a log file"
      });
    }

    const content =
      fs.readFileSync(req.file.path, "utf-8");

    const lines = content.split("\n");

    const validLogs = [];

    let malformedLines = 0;

    for (const line of lines) {

      if (!line.trim()) {
        continue;
      }

      const parsedLine = parseLine(line);

      if (parsedLine) {
        validLogs.push(parsedLine);
      } else {
        malformedLines++;
      }
    }

    fs.unlinkSync(req.file.path);

    const report =
      analyzeLogs(validLogs, malformedLines);

    res.json(report);

  } catch (error) {

    res.status(500).json({
      error: "Something went wrong while processing the file."
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});