function parseLine(line) {

  if (!line || line.trim() === "") {
    return null;
  }

  line = line.trim();

  if (line.startsWith("{")) {

    try {

      const log = JSON.parse(line);

      let respTime = log.responseTime;
      if (respTime && typeof respTime === "string") {
        if (respTime.endsWith("ms")) {
          respTime = Number(respTime.replace("ms", ""));
        } else if (respTime.endsWith("s")) {
          respTime = Number(respTime.replace("s", "")) * 1000;
        } else {
          respTime = Number(respTime);
        }
      }

      return {
        timestamp: log.timestamp || null,
        ip: log.ip || null,
        method: log.method || null,
        path: log.path || null,
        status: log.status || null,
        responseTime: respTime || null
      };

    } catch {
      return null;
    }
  }

  const parts = line.split(" ");

  if (parts.length < 6) {
    return null;
  }

  let rawTime = parts[5];
  let finalTime = null;

  if (rawTime) {
    if (rawTime.endsWith("ms")) {
      finalTime = Number(rawTime.replace("ms", ""));
    } else if (rawTime.endsWith("s")) {
      finalTime = Number(rawTime.replace("s", "")) * 1000;
    } else {
      finalTime = Number(rawTime);
    }
  }

  let statusCode = parts[4];
  let finalStatus = null;
  if (statusCode !== "-") {
    finalStatus = Number(statusCode);
  }

  return {
    timestamp: parts[0],
    ip: parts[1],
    method: parts[2],
    path: parts[3],
    status: finalStatus,
    responseTime: finalTime
  };
}

function normalizeResponseTime(value) {
  if (!value) {
    return null;
  }

  if (value.endsWith("ms")) {
    return Number(value.replace("ms", ""));
  }

  if (value.endsWith("s")) {
    return Number(value.replace("s", "")) * 1000;
  }

  return Number(value);
}

module.exports = parseLine;