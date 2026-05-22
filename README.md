# Log Analyzer

A simple Log Analyzer built using Node.js and Express.

This project allows users to upload a server log file and view a summary report in the browser. It processes logs, handles malformed lines safely, and generates useful insights.

---

## Features

- Upload log file from browser
- Analyze logs automatically
- Handles malformed and empty lines safely
- Supports normal log format and JSON format
- Supports multiple response time formats (ms, s, number)
- Shows status code summary
- Shows endpoint usage summary
- Simple UI for testing

---

## Tech Stack

Node.js, Express, Multer, HTML, CSS, JavaScript

I used Node.js and Express because the task is mainly about file handling and text processing. JavaScript is good for parsing logs and working with JSON, so it makes the implementation simple and clean.

Frontend is built with plain HTML, CSS, and JavaScript because the UI is very simple and does not need any framework.

---

## Project Structure

public → frontend files  
src → backend logic (server, parser, analyzer)  
scripts → log generator  
sample-logs → test logs  
uploads → temporary uploaded files  

---

## Installation

Run:

npm install

---

## Run Project

Start server:

node src/server.js

Open in browser:

http://localhost:3000

---

## Generate Sample Logs

Run:

node scripts/generateLogs.js

This will create a file:

sample-logs/generated.log

---

## How to Use

1. Open application in browser
2. Upload a log file
3. Click Analyze Logs
4. View results on screen

---

## Example Log Formats

Standard log:
2024-03-15T14:23:01Z 192.168.1.42 GET /api/users 200 142ms

JSON log:
{"timestamp":"2024-03-15","ip":"10.0.0.1","method":"GET","path":"/json-api","status":200,"responseTime":"120ms"}

Malformed log:
BROKEN LOG LINE