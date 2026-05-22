const analyzeBtn =
  document.getElementById("analyzeBtn");

const resultDiv =
  document.getElementById("result");

analyzeBtn.addEventListener("click", async () => {

  const fileInput =
    document.getElementById("logFile");

  const file = fileInput.files[0];

  if (!file) {
    resultDiv.innerHTML =
      "Please select a log file.";
    return;
  }

  const formData = new FormData();

  formData.append("logFile", file);

  try {

    resultDiv.innerHTML = "Analyzing logs...";

    const response = await fetch("/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    resultDiv.innerHTML = `
      <h3>Analysis Report</h3>

      <p><strong>Total Valid Logs:</strong> ${data.totalValidLogs}</p>

      <p><strong>Malformed Lines:</strong> ${data.malformedLines}</p>

      <p><strong>Average Response Time:</strong> ${data.averageResponseTime}</p>

      <h4>Status Codes</h4>
      <pre>${JSON.stringify(data.statusCodes, null, 2)}</pre>

      <h4>Endpoints</h4>
      <pre>${JSON.stringify(data.endpoints, null, 2)}</pre>
    `;

  } catch (error) {

    resultDiv.innerHTML =
      "Failed to analyze the file.";
  }
});